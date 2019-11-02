import express from 'express';
import mentorController from '../controllers/mentorController';
import checkToken from '../helpers/checkToken';

const router = express.Router();
router.post('/', checkToken, mentorController.createMentor);
router.get('/', mentorController.allMentors);
router.patch('/:id', checkToken, mentorController.updateMentor);
router.delete('/:id', checkToken, mentorController.deleteMentor);

export default router;