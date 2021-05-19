const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');

module.exports = async (req, res) => {
    const {id} = req.params;

    try {
        const point = await WifiPoint.findById(id);
        console.log('Point => ', point);
        if (!point) {
            res.status(404).json({
                error: true,
                message: ERROR.POINT_NOT_FOUND
            });
        }

        await point.remove();

        res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
}
