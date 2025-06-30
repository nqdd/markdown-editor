import { createToken } from '@repo/ioc/token';
import { UserEntity } from '../entities/user.entity';

export const tUserRepository = createToken<UserRepository>('USER_REPOSITORY');

export interface UserRepository {
  getByEmail(email: string): Promise<UserEntity | null>;
}
