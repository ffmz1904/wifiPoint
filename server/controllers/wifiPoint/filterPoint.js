const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');

module.exports = async (req, res) => {
    const { name, type, frequency, speed, coordinates, radius } = req.body;
    const filterQuery = {};

    if (name) {
        const nameFilter = new RegExp(name, 'i');
        filterQuery.name = nameFilter;
    }

    if (type) {
        filterQuery.type = type;
    }

    if (frequency) {
        filterQuery.frequency = frequency;
    }

    if (speed) {
        filterQuery.speed = { $gte: speed };
    }

    if (coordinates) {
        filterQuery.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [coordinates.lat, coordinates.lng],
                },
                $maxDistance: radius ? radius : 1
            }
        }
    }
    // console.log(filterQuery)

    try {
        const points = await WifiPoint.find(filterQuery);

        res.status(200).json({
            success: true,
            points
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            error: true,
            message: ERROR.SOMETHING_WAS_WRONG
        });
    }
}
