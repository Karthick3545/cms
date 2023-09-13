import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permission } from './interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  matchRoles(permissions: string[], userPermite: any) {
    return permissions.some((permission) => permission === userPermite);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const permissions = this.reflector.get<any>('permissions',context.getHandler());
    console.log(permissions[0], permission);
    if(!permissions){
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(permission[user.role]);

    return this.matchRoles(permission[user.role], permissions[0]);
  }
}
