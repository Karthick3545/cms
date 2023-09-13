import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permission } from './interface';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector, private roleServices: RoleService) {}

  matchRoles(permissions: string[], userPermite: any) {
    return permissions.some((permission) => permission === userPermite);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // const roles = this.reflector.get<string[]>('roles',context.getHandler());
    // const roles: string[] = Object.keys(permission); 

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = await this.roleServices.findName(user.role); 
    
    if(!roles) {
      return false;
    }
    
    const permissions = this.reflector.get<any>('permissions',context.getHandler());
    
    return this.matchRoles(roles.permissions.split(','), permissions[0]);
  }
}
