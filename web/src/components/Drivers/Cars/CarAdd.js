import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import CarsRow from './CarsRow';

class CarAdd extends React.Component {

    constructor(props) {
        super(props);
        this.driver_id = props.match.params.id;
        this.state = {
            cars: []
        }
    }

    componentDidMount = () => {
        this.fetchCars()
    }

    fetchCars = () => {
        console.log("fetch cars");
        axios.get(`http://localhost:3001/drivers/${this.driver_id}/cars`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    cars: response.data.cars,
                })
            }).catch((error) => {
                console.log(error);
            })
    }

    handleUpdate = (id, driver_data) => {
        console.log("save Driver");
        axios.put(`http://localhost:3001/drivers/${id}/cars`, driver_data)
            .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                this.fetchCars();
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

    handleAdd = () => {
        
    }


    render() {
        let { cars } = this.state;
        let cars_list = cars.map((car) =>
            <CarsRow key={car.id} car={car} handleUpdate={this.handleUpdate} />
        );
        return (
            <div className="container">
                <div className="row justify-content-end">
                    <div class="col-1">
                        <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                    </div>
                </div>
                <div className="row">
                    <table className="table drivers-table">
                        <caption>Cars</caption>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Model</th>
                                <th>Active</th>
                                <th>Type</th>
                                <th>Amenities</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cars_list}
                        </tbody>
                    </table>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        )
    }
}
export default CarAdd