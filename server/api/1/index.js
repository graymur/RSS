import express from 'express';
import * as handlers from './endpoints';
// import userMiddleware from './middleware/user.js';
const router = express.Router();
import checkAuth from '../../middlewares/checkAuth'

import db from '../../db';

// router.use(userMiddleware);

router.get('/feeds', checkAuth, handlers.feeds);
router.get('/feed', checkAuth, handlers.feed);
router.get('/check', checkAuth, handlers.check);
router.get('/fetch', checkAuth, handlers.fetch);
router.get('/update', checkAuth, handlers.update);
router.put('/save', checkAuth, handlers.save);
router.post('/mark-read', checkAuth, handlers.markRead);

export default router;
