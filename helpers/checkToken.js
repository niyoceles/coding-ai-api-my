import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkToken = (req, res, next) => {
  const token = req.headers['token'] || req.body['token'] || null;

  if (!token) {
    return res.status(401).json({
      error: 'Please, Authentication is required!',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        error: 'Failed to authenticate token',
      });
    }
    req.decodedToken = decoded || null;
    next();
    return true;
  });
  return true;
};

export default checkToken;