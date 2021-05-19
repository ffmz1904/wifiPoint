const { ERROR } = require('../../utils/errors');
const { USER_ROLE } = require('../../utils/constants');
const bcrypt = require('bcrypt');
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
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(409).json({
               error: true,
               message: ERROR.USER_ALREADY_EXIST
            });
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, role: USER_ROLE.USER });

        res.status(200).json({
           success: true,
           user
        });
    } catch (e) {
        res.status(500).json({
           error: true,
           message: ERROR.SOMETHING_WAS_WRONG
        });
    }
};
