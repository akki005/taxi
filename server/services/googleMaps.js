const googleMapsClient = require('@google/maps').createClient({
    key: process.env.REACT_APP_GOOGLE_KEY,
    Promise: Promise
});
module.exports.mapService = {
    getDistanceBetweenGeoLocations: async (origins, destinations) => {
        try {
            let response = await googleMapsClient.distanceMatrix({
                origins: origins,
                destinations: destinations,
                units: "metric"
            }).asPromise().catch((error)=>{
                console.log(error);
            })

            let distance_element = response.json.rows[0].elements[0];
            if (distance_element.status === "OK") {
                return  distance_element.distance.value ;
            } else if (distance_element.status === "NOT_FOUND") {
                return Promise.reject({ error: "invalid geo locations", type: "map_api" });
            } else if (distance_element.status === "ZERO_RESULTS") {
                return Promise.reject({ error: "no route found between locations", type: "map_api" });
            } else if (distance_element.status === "MAX_ROUTE_LENGTH_EXCEEDED") {
                return Promise.reject({ error: "origin and destination are too far away", type: "map_api" });
            }else{
                return Promise.reject({ error: "origin and destination are too far away", type: "map_api" });

            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
};