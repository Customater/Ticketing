import * as bcrypt from 'bcryptjs';
import { config } from '../../configuration/configuration.service';

export async function transformPassword(user: {
  password?: string;
}): Promise<void> {
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      config.get('authentication_jwt.hash-salt'),
    );
  }
  return Promise.resolve();
}
