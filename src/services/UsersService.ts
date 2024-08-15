import { User } from '../models';
import { TErrorKeys } from '../types';

class UsersService {
  async getProfileDataById(userId: string) {
    try {
      const user = await User.findById(userId, {
        password: false,
        _id: false,
        __v: false,
      });

      return user;
    } catch (error) {
      console.log('Failed to get profile data', error);
      throw new Error(TErrorKeys.USER_NOT_FOUND);
    }
  }
}
export default new UsersService();
