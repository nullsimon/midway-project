import {UserEntity} from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserModel {
    @InjectEntityModel(UserEntity)
    userRepo: Repository<UserEntity>;

    /**
     * 根据用户名和密码查询用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async getUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {
                username,
                password,
            },
        });
    }
   async getUserByID(id: number): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {
                id,
            },
        });
    }
    async saveUser(user: UserEntity): Promise<UserEntity> {
        return await this.userRepo.save(user);
    }
}