const express = require('express');
const router = express.Router();
const LoginActivityController = require('../controllers/login-activity.controller');

router.post('/', LoginActivityController.recordActivity);
router.get('/', LoginActivityController.getActivities);
router.get('/user/:userId', LoginActivityController.getUserActivities);

module.exports = router;
