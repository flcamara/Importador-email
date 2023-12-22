import express from 'express';
import routeMails from './routeMail.js';

const router = express.Router({ mergeParams: true });

router.use('/send', routeMails);


export default router;