module.exports.FIND_RIDES =
    `SELECT 
driver.id as driver_id,concat(driver.first_name," ",driver.last_name) as driver_name, driver.contact as driver_contact,cars.id as car_id, shift.id as shift_id
FROM
driver
    INNER JOIN
(SELECT 
    car.id, driver_id
FROM
    car
LEFT JOIN car_to_amenity AS cta ON cta.car_id = car.id
LEFT JOIN amenity ON cta.amenity_id = amenity.id
LEFT JOIN car_type ON car.type_id = car_type.id
WHERE
    car.active = 1
        AND car_type.id = :trip_car_type_id
GROUP BY car.id) AS cars ON cars.driver_id = driver.id
    INNER JOIN
shift ON shift.driver_id = driver.id
WHERE
driver.active = 1
    AND shift.available = 1
    AND shift.day = :trip_day
    AND shift.start <= :trip_start_time
    AND shift.end >= :trip_end_time for update;`

module.exports.FIND_RIDES_WITH_SPECIFIC_AMENITIES =
    `SELECT 
    driver.id as driver_id,concat(driver.first_name," ",driver.last_name) as driver_name, driver.contact as driver_contact,cars.id as car_id, shift.id as shift_id
    FROM
    driver
        INNER JOIN
    (SELECT 
        car.id, driver_id
    FROM
        car
    LEFT JOIN car_to_amenity AS cta ON cta.car_id = car.id
    LEFT JOIN amenity ON cta.amenity_id = amenity.id
    LEFT JOIN car_type ON car.type_id = car_type.id
    WHERE
        amenity.id IN (:trip_amenity_ids) AND car.active = 1
            AND car_type.id = :trip_car_type_id
    GROUP BY car.id) AS cars ON cars.driver_id = driver.id
        INNER JOIN
    shift ON shift.driver_id = driver.id
    WHERE
    driver.active = 1
        AND shift.available = 1
        AND shift.day = :trip_day
        AND shift.start <= :trip_start_time
        AND shift.end >= :trip_end_time for update;`


module.exports.NEW_QUERY =
    `SELECT 
    driver.id AS driver_id,
    CONCAT(driver.first_name, ' ', driver.last_name) AS driver_name,
    driver.contact AS driver_contact,
    cars.id AS car_id,
    shift.id AS shift_id
    FROM
    driver
        INNER JOIN
    (SELECT 
        car.id, driver_id
    FROM
        car
    LEFT JOIN car_to_amenity AS cta ON cta.car_id = car.id
    LEFT JOIN amenity ON cta.amenity_id = amenity.id
    LEFT JOIN car_type ON car.type_id = car_type.id
    WHERE
        car.active = 1 AND car_type.id = :trip_car_type_id
    GROUP BY car.id) AS cars ON cars.driver_id = driver.id
        INNER JOIN
    shift ON shift.driver_id = driver.id
    WHERE
    driver.active = 1
        AND shift.available = 1
        AND shift.day = :trip_day
        AND shift.start <= :trip_start_time
        AND shift.end >= :trip_end_time
        AND driver.id not in (SELECT DISTINCT
        (driver_id)
    FROM
        driver_booking
    WHERE
        UNIX_TIMESTAMP(:trip_start_date_time) BETWEEN UNIX_TIMESTAMP(CONCAT(date, ' ', trip_start)) AND UNIX_TIMESTAMP(CONCAT(date, ' ', trip_end))
            AND UNIX_TIMESTAMP(:trip_end_date_time) BETWEEN UNIX_TIMESTAMP(CONCAT(date, ' ', trip_start)) AND UNIX_TIMESTAMP(CONCAT(date, ' ', trip_end)));
        
`

module.exports.NEW_QUERY_AMENITIES =
    `SELECT 
    driver.id AS driver_id,
    CONCAT(driver.first_name, ' ', driver.last_name) AS driver_name,
    driver.contact AS driver_contact,
    cars.id AS car_id,
    cars.amenity_ids,
    shift.id AS shift_id
    FROM
    driver
        INNER JOIN
    (SELECT 
        car.id, driver_id, group_concat(amenity.id) as amenity_ids
    FROM
        car
    LEFT JOIN car_to_amenity AS cta ON cta.car_id = car.id
    LEFT JOIN amenity ON cta.amenity_id = amenity.id
    LEFT JOIN car_type ON car.type_id = car_type.id
    WHERE
        amenity.id IN (:trip_amenity_ids) AND car.active = 1 AND car_type.id = :trip_car_type_id
    GROUP BY car.id having count(amenity_id)=:trip_amenity_count) AS cars ON cars.driver_id = driver.id
        INNER JOIN
    shift ON shift.driver_id = driver.id
    WHERE
    driver.active = 1
        AND shift.available = 1
        AND shift.day = :trip_day
        AND shift.start <= :trip_start_time
        AND shift.end >= :trip_end_time
        AND driver.id not in (SELECT DISTINCT
        (driver_id)
    FROM
        driver_booking
    WHERE
        UNIX_TIMESTAMP(:trip_start_date_time) BETWEEN UNIX_TIMESTAMP(CONCAT(date, ' ', trip_start)) AND UNIX_TIMESTAMP(CONCAT(date, ' ', trip_end))
            AND UNIX_TIMESTAMP(:trip_end_date_time) BETWEEN UNIX_TIMESTAMP(CONCAT(date, ' ', trip_start)) AND UNIX_TIMESTAMP(CONCAT(date, ' ', trip_end)));`
