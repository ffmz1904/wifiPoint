const { ERROR } = require('../../utils/errors');
const WifiPoint = require('../../models/WifiPoint');
const getDistance = require('../../helpers/searchDistance');

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

    try {
        let points = await WifiPoint.find(filterQuery);

        if (coordinates) {
            points = points.filter(point => {
               const pointsDistance = getDistance({
                   lat: point.location.coordinates[0],
                   lng: point.location.coordinates[1]
               }, {
                   lat: coordinates.lat,
                   lng: coordinates.lng
               });

               if (pointsDistance <= radius) {
                   return point;
               }
            });
        }

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
