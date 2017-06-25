import express from 'express';
import * as handlers from './endpoints';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

import db from '../../db'; // eslint-disable-line

router.get('/feeds', checkAuth, handlers.feeds);
router.get('/feed', checkAuth, handlers.feed);
router.get('/check', checkAuth, handlers.check);
router.get('/fetch', checkAuth, handlers.fetch);
router.get('/update-feed-posts', checkAuth, handlers.updateFeedPosts);
router.put('/save', checkAuth, handlers.save);
router.post('/mark-read', checkAuth, handlers.markRead);
router.get('/group-posts', checkAuth, handlers.groupPosts);
router.get('/posts', checkAuth, handlers.posts);
router.post('/group', checkAuth, handlers.group);

export default router;
