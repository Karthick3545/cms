import { SetMetadata } from '@nestjs/common';

export const Permissions = (...args: any) => SetMetadata('permissions', args);
