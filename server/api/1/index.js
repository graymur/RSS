import express from 'express';
import * as handlers from './endpoints';
import userMiddleware from './middleware/user.js';
const router = express.Router();

import db from './db';

router.use(userMiddleware);

router.get('/feeds', handlers.feeds);
router.get('/feed', handlers.feed);
router.get('/check', handlers.check);
router.get('/fetch', handlers.fetch);
router.get('/update', handlers.update);
router.put('/save', handlers.save);
router.post('/mark-read', handlers.markRead);

export default router;
