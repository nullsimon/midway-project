import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import {UserModel} from '../model/user.model';
import {UserLoginDTO} from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Controller('/api/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  init() {
    let user = new UserEntity();
    user.username = "jack";
    user.password = "redballoon";
    
    const userResult = this.userModel.saveUser(user);
    console.log("init user:", userResult);
  }

  @Get('/')
  async getUser(@Query('id') id:number) {
    const user = await this.userModel.getUserByID(id);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(@Body() login: UserLoginDTO) {
    const {username, password} = login;
    const user = await this.userModel.getUserByUsernameAndPassword(username, password);
    if (user != null) {
        return { success: true, message: 'OK', data: user };
    }
    return { success: false, message: 'FAIL', data: null };
  }


  @Post('/')
  async saveUser(@Body() login: UserLoginDTO) {
    let user = new UserEntity();
    user.username = login.username;
    user.password = login.password
    const addUser = await this.userModel.saveUser(user);
    if (addUser != null) {
        return { success: true, message: 'OK', data: addUser };
    }
    return { success: false, message: 'FAIL', data: null };
  }
}