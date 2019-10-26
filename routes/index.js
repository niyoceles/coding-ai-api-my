import express from 'express';

import user from './user';
import mentor from './mentor';

const router = express.Router();

router.use('/user', user);
router.use('/mentor', mentor);

export default router;