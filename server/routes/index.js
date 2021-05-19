const Router = require('express');
const router = new Router();

const authRouter = require('./authRoutes');
const wifiPointRouter = require('./wifiPointRoutes');

router.use('/auth', authRouter);
router.use('/wifi', wifiPointRouter);

module.exports = router;
