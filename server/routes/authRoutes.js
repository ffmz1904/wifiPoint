const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/register', authController.registration);
router.post('/login', authController.login);
router.post('/check', AuthMiddleware, authController.check);

module.exports = router;
