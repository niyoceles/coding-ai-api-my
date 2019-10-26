import models from '../models'

const { User } = models

class userController {
  static async signUp(req, res) {
    const { username, email, password } = req.body;
    try {
      const userSignup = await User.create({
        username,
        email,
        password
      });
      return res.status(200).json({
        User: userSignup,
        message: 'successful sign up',
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const userSignin = await User.findOne({
        where: {
          email, password
        },
      });
      if (!userSignin) {
        return res.status(404).json({
          error: 'Email and Password are not match',
        });
      }
      return res.status(200).json({
        User: userSignin,
        message: 'successful sign in',
      });

    } catch (error) {
      console.log(error);
    }
  }
}

export default userController;
