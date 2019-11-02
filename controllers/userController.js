import models from '../models';
import Auth from '../helpers/Auth'

const { User } = models

class userController {
  static async signUp(req, res) {
    const { username, email, password } = req.body;
    const hashPassword = Auth.hashPassword(password);
    try {
      const userSignup = await User.create({
        username,
        email,
        password: hashPassword
      });
      return res.status(200).json({
        user: {
          email: userSignup.email,
          username: userSignup.username,
        },
        message: 'successful sign up',
        token: Auth.getToken(userSignup.id, email, username),
      });

    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign up' });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const checkUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!checkUser) {
        return res.status(404).json({ error: 'user not found' });
      }
      const compared = Auth.comparePassword(password, checkUser.password);
      if (!compared) {
        return res.status(404).json({
          error: 'Email and Password are not match',
        });
      }
      return res.status(200).json({
        User: {
          id: checkUser.id,
          email,
          username: checkUser.username,
          token: Auth.getToken(checkUser.id, email, checkUser.username),
        },
        message: 'successful sign in',
      });

    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign in' });
    }
  }
}

export default userController;
