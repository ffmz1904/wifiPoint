const { ERROR } = require('../../utils/errors');
const { USER_ROLE } = require('../../utils/constants');
const bcrypt = require('bcrypt');
const generateJWT = require('../../helpers/generateJWT');
const User = require('../../models/User');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: ERROR.BAD_REQUEST
        });
    }

    try {
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return res.status(404).json({
                error: true,
                message: ERROR.USER_NOT_FOUND
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).json({
                error: true,
                message: ERROR.BAD_PASSWORD
            });
        }

        const token = generateJWT(user.id, user.email);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
};
