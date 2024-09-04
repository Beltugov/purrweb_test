import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../../user/users.service";

@Injectable()
export class UsersGuard implements CanActivate {
    constructor(private jwtService: JwtService,private usersService: UsersService) {
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return Number(request.params.userId) === this.jwtService.decode(request.headers.authorization.split(" ")[1]).id
    }
}