const { ERROR } = require('../utils/errors');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            error: true,
            message: ERROR.USER_NOT_FOUND
        });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({
            error: true,
            message: ERROR.UNAUTHORIZED
        });
    }
    next();
}
