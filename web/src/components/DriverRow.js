

import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default function DriverRow({ driver }) {
    return (
        <tr>
            <td>{driver.id}</td>
            <td>{driver.name}</td>
            <td><Link to={`/drivers/${driver.id}/shifts`}>Add</Link></td>
        </tr>
    )
}