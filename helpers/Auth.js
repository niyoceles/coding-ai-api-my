import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dontenv from 'dotenv';

dontenv.config();

class Auth {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static getToken(id, email, username) {
    const token = jwt.sign(
      {
        id,
        email,
        username
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
    return token;
  }

  static decodeToken(token) {
    let payload = '';
    jwt.verify(token, process.env.SECRET, (decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Auth;