import express from 'express';
import mentorController from '../controllers/mentorController';

const router = express.Router();
router.post('/', mentorController.createMentor);
router.get('/', mentorController.allMentors);
router.patch('/:id', mentorController.updateMentor);
router.delete('/:id', mentorController.deleteMentor);

export default router;