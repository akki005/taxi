import React from 'react'
import axios from "axios";
import {Link } from 'react-router-dom'

class DriversTable extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.match);
        this.driver_id = props.match.params.id;
        console.log(this.driver_id);
        this.state = {
            drivers: []
        }
    }

    componentDidMount = () => {
        this.fetchShifts()
    }

    fetchShifts = () => {
        axios.get(`http://localhost:3001/drivers`)
            .then((response) => {
                this.setState({
                    drivers: response.data,
                })
            }).catch((error) => {
                console.log(error);
            })
    }


    render() {
        let { drivers } = this.state;
        let drivers_list = drivers.map((driver) =>
            <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <Link to={`/drivers/${driver.id}/shifts`}>Add</Link>
            </tr>
        );
        return (
            <div className="row justify-content-md-center">
                <table className="table drivers-table">
                    <caption>Drivers</caption>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Shifts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers_list}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default DriversTable