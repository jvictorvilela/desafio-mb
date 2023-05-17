import express from 'express';
import RegistrationController from '../controllers/RegistrationController.js';

const router = express.Router();

router.get('/', RegistrationController.show);
router.post('/', RegistrationController.save);

export default router;