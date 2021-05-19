const { ERROR } = require('../../utils/errors');
const generateJWT = require('../../helpers/generateJWT');
const User = require('../../models/User');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(500).json({
                error: true,
                message: ERROR.USER_NOT_FOUND
            });
        }

        const token = generateJWT(req.user._id, req.user.email);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
};
