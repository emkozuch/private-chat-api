import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginRequestDto, TErrorKeys } from '../types';

class AuthService {
  private secret = process.env.JWT_SECRET!;

  async login({ email, password }: LoginRequestDto): Promise<string> {
    if (!email || !password) throw new Error(TErrorKeys.MISSING_DATA);

    const user = await User.findOne({ email });

    if (!user) throw new Error(TErrorKeys.WRONG_EMAIL_OR_PWD);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error(TErrorKeys.WRONG_EMAIL_OR_PWD);

    const token = jwt.sign({ id: user._id }, this.secret, {
      expiresIn: '1h',
    });

    return token;
  }
}
export default new AuthService();
