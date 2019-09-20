import React, { Component } from 'react';



export default function BookingInfo({driver_name,driver_contact,car_id,trip_fare}) {
    return (
        <table className="table">
            <caption>Booking Information</caption>
            <thead>
                <tr>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Driver Contact</th>
                    <th scope="col">Car Licence Number</th>
                    <th scope="col">Fare</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{driver_name}</td>
                    <td>{driver_contact}</td>
                    <td>{car_id}</td>
                    <td>{trip_fare}</td>
                </tr>
            </tbody>
        </table>
    )
}