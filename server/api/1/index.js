const express = require('express');
const router = express.Router();

router.use(require('./middleware/user.js'));

router.get('/feeds', require('./endpoints/feeds.js'));
router.get('/feed', require('./endpoints/feed.js'));
router.get('/check', require('./endpoints/check.js'));
router.get('/fetch', require('./endpoints/fetch.js'));
router.get('/update', require('./endpoints/update.js'));
router.put('/save', require('./endpoints/save.js'));
router.post('/mark-read', require('./endpoints/mark-read.js'));

module.exports = router;
