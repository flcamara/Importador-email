import express from 'express';

import mailController from '../controllers/mailController.js';


const router = express.Router();

router.post('/', mailController.upload);

export default router;