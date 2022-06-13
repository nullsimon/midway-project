import { isNullOrUndefined } from "@midwayjs/decorator/dist/util";
import { Rule } from "@midwayjs/validate";

export class UserLoginDTO {
    @Rule(isNullOrUndefined)
    username: string;

    @Rule(isNullOrUndefined)
    password: string;
}