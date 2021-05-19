const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');

module.exports = async (req, res) => {
    const { name, coordinates, address, type, speed, frequency, password } = req.body;

    try {
        const point = await WifiPoint.create({
            name,
            address,
            type,
            speed,
            frequency,
            password,
            location: { type: 'Point', coordinates: [ coordinates.lat, coordinates.lng ] },
        });

        res.status(200).json({
           success: true,
           point
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
}
