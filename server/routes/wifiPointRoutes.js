const Router = require('express');
const router = new Router();
const wifiPointController = require('../controllers/wifiPoint');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const CheckRole = require('../middlewares/CheckRole');

router.post('/', AuthMiddleware, wifiPointController.create);
router.put('/:id', AuthMiddleware, CheckRole, wifiPointController.update);
router.delete('/:id', AuthMiddleware, CheckRole, wifiPointController.remove);
router.get('/', wifiPointController.getAll);
router.post('/filter', wifiPointController.filterPoint);

module.exports = router;
