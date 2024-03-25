import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import {
  RequireLogin,
  RequirePermission,
} from './user/decorator/require.decorator';
import { userInfo } from 'os';
import { Userinfo } from './user/decorator/userinfo.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @SetMetadata('require-login', true)
  @SetMetadata('require-permission', ['ddd'])
  @RequireLogin()
  @RequirePermission('ddd')
  aaaa(@Userinfo('username') username, @Userinfo() userinfo) {
    console.log('[username, userinfo]===>', username, userinfo);
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
