import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/login', userController.googleLogin);
router.get('/:userId', userController.getUser);

export default router;
