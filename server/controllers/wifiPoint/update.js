const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');
const User = require('../../models/User');

module.exports = async (req, res) => {
    const {id} = req.params;
    const updateParams = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                error: true,
                message: ERROR.USER_NOT_FOUND
            });
        }

        const point = await WifiPoint.findById(id);

        if (!point) {
            return res.status(404).json({
                error: true,
                message: ERROR.POINT_NOT_FOUND
            });
        }

        if (user.role === 'user' && String(point.userId) !== String(user._id)) {
            return res.status(403).json({
                error: true,
                message: ERROR.FORBIDDEN
            });
        }

        for(let param in updateParams) {
            if (param === "coordinates") {
                point.location.coordinates = [updateParams[param].lat,  updateParams[param].lng];
            } else {
                point[param] = updateParams[param];
            }
        }

        await point.save();

        res.status(200).json({
            success: true,
            point
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
}
