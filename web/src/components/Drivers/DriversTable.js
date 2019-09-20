import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import DriverRow from "./driverTableRow";
import { ToastContainer, toast } from 'react-toastify';

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
        this.fetchDrivers()
    }

    fetchDrivers = () => {
        console.log("fetch drivers");
        axios.get(`http://localhost:3001/drivers`)
            .then((response) => {
                this.setState({
                    drivers: response.data,
                })
            }).catch((error) => {
                console.log(error);
            })
    }

    handleUpdate = (id, driver_data) => {
        console.log("save Driver");
        axios.put(`http://localhost:3001/drivers/${id}`, driver_data)
            .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                this.fetchDrivers();
            }).catch((error) => {
                let status = error.response.status;
                let message = error.response.data.message;
                console.log(status, message);
                if (error.response) {
                    toast.warn(message)
                } else if (error.request) {
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error(message)

                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error(message)
                }
            })
    }


    render() {
        let { drivers } = this.state;
        let drivers_list = drivers.map((driver) =>
            <DriverRow key={driver.id} driver={driver} handleUpdate={this.handleUpdate} />
        );
        return (
            <div className="container">
                <table className="table drivers-table">
                    <caption>Drivers</caption>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Active</th>
                            <th>Contact</th>
                            <th>Actions</th>
                            <th>Shifts</th>
                            <th>Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers_list}
                    </tbody>
                </table>
                <ToastContainer autoClose={2000} />
            </div>
        )
    }
}
export default DriversTable