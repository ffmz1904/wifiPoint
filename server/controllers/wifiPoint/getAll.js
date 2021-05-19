const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');

module.exports = async (req, res) => {
    try {
        const points = await WifiPoint.find();

        res.status(200).json({
            success: true,
            points
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
}
