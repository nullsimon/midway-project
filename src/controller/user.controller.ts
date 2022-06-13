import { Inject, Controller, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import {UserModel} from '../model/user.model';
import {UserLoginDTO} from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/api/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
    jwt: JwtService;

  init() {
    let user = new UserEntity();
    user.username = "jack";
    user.password = "redballoon";
    
    const userResult = this.userModel.saveUser(user);
    console.log("init user:", userResult);
  }

  @Get('/' , { middleware: [JwtPassportMiddleware] })
  async getUser() {
    console.log(this.ctx.state);
    let id = this.ctx.state.user.user.id;
    const user = await this.userModel.getUserByID(id);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(@Body() login: UserLoginDTO) {
    const {username, password} = login;
    const user = await this.userModel.getUserByUsernameAndPassword(username, password);
    let token = await this.jwt.sign({user})
    if (user != null) {
        return { 
            code: 200,
            result: "success",
            message: "登录成功",
            data: {
                token: token,
            }
        };
    }
    return { 
        code: 400,
        result: 'error', 
        message: '账号或密码不正确',
        data: null 
    };
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