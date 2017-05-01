import express from 'express';
import * as handlers from './endpoints';
import userMiddleware from './middleware/user.js';
const router = express.Router();

import db from '../../db';

// router.use(userMiddleware);

router.get('/feeds', userMiddleware, handlers.feeds);
router.get('/feed', userMiddleware, handlers.feed);
router.get('/check', userMiddleware, handlers.check);
router.get('/fetch', userMiddleware, handlers.fetch);
router.get('/update', userMiddleware, handlers.update);
router.put('/save', userMiddleware, handlers.save);
router.post('/mark-read', userMiddleware, handlers.markRead);

export default router;
