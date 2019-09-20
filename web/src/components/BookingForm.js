import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Script from 'react-load-script';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import BookingInfo from './BookingInfo';

class BookingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip_start_location: "",
            trip_end_location: "",
            trip_start_geo_location: {},
            trip_end_geo_location: {},
            start_date: new Date(),
            start_hour: "00",
            end_hour: "00",
            start_min: "00",
            end_min: "00",
            car_types: [],
            car_amenities: [],
            trip_car_type_id: 0,
            trip_amenity_ids: new Set(),
            booking_details: undefined
        }
        this.autocompleteOrigin = null;
        this.autocompleteDestination = null;
    }

    componentDidMount = () => {
        axios.all([axios.get("http://localhost:3001/cars/types"), axios.get("http://localhost:3001/cars/amenities")]).then(axios.spread((car_types, car_amenities) => {
            this.setState({
                car_types: car_types.data,
                car_amenities: car_amenities.data,
                trip_car_type_id: car_types.data[0].id
            })
        })).catch((error) => {
            console.log(error);
        })
    }


    handleCarTypeChange = event => {
        this.setState({
            trip_car_type_id: Number(event.target.value)
        })
    }

    handleAmenityTypeChange = event => {

        let value = Number(event.target.value);
        let checked = event.target.checked;

        this.setState(function (prev_state) {
            checked === true ? prev_state.trip_amenity_ids.add(value) : prev_state.trip_amenity_ids.delete(value)
            return {
                trip_amenity_ids: prev_state.trip_amenity_ids
            }
        }, () => {
            console.log(this.state.trip_amenity_ids);
        })
    }


    handleTimeChange = event => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    };

    handleStartDateChange = event => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    };

    handleAddressChange = (event) => {
        let origin_meta = this.autocompleteOrigin.getPlace()
        let destination_meta = this.autocompleteDestination.getPlace()

        if (origin_meta) {
            this.setState({
                trip_start_location: origin_meta.formatted_address,
                trip_start_geo_location: {
                    lat: origin_meta.geometry.location.lat(),
                    lng: origin_meta.geometry.location.lng()
                }
            })
        };
        if (destination_meta) {
            this.setState({
                trip_end_location: destination_meta.formatted_address,
                trip_end_geo_location: {
                    lat: destination_meta.geometry.location.lat(),
                    lng: destination_meta.geometry.location.lng()
                }
            })
        };
    }

    handleSubmit = (event) => {

        event.preventDefault();

        let trip_amenity_ids = [...this.state.trip_amenity_ids];

        let trip_data = {
            trip_start_location: this.state.trip_start_location,
            trip_end_location: this.state.trip_end_location,
            trip_end_geo_location: this.state.trip_end_geo_location,
            trip_start_geo_location: this.state.trip_start_geo_location,
            trip_start_date_time: `${this.state.start_date}T${this.state.start_hour}:${this.state.start_min}:00`,
            trip_end_date_time: `${this.state.start_date}T${this.state.end_hour}:${this.state.end_min}:00`,
            trip_amenity_ids: trip_amenity_ids,
            trip_car_type_id: this.state.trip_car_type_id
        }
        console.log(trip_data);
        axios.post('http://localhost:3001/rides/book', trip_data).then((response) => {
            toast.success("Ride booked");
            this.setState({
                booking_details: response.data
            })

        }).catch((error) => {
            let status = error.response.status;
            let message = error.response.data.message;
            console.log(status, message);
            if (error.response) {
                toast.warn(message)
            } else if (error.request) {
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                toast.error(error.response.data.message)

            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error(error.response.data.message)
            }
        })

    }

    handleScriptLoad = (event) => {
        /*global google*/
        this.autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById("origin"), {});
        this.autocompleteOrigin.setComponentRestrictions(
            { 'country': ['in'] });
        this.autocompleteOrigin.setFields(['formatted_address', 'geometry']);
        this.autocompleteOrigin.addListener("place_changed", this.handleAddressChange);

        this.autocompleteDestination = new google.maps.places.Autocomplete(document.getElementById("destination"), {});
        this.autocompleteDestination.setComponentRestrictions(
            { 'country': ['in'] });
        this.autocompleteDestination.setFields(['formatted_address', 'geometry']);
        this.autocompleteDestination.addListener("place_changed", this.handleAddressChange);
    }


    render() {
        let { start_date, start_hour, start_min, end_hour, end_min } = this.state;
        let car_type_list = this.state.car_types.map((type) =>
            <div className="form-check col-md-3" key={type.id}>
                <input
                    type="radio"
                    value={type.id}
                    checked={this.state.trip_car_type_id === type.id}
                    onChange={this.handleCarTypeChange}
                />
                <label className="form-check-label">
                    {type.type}
                </label>
            </div>)

        let amenity_types = this.state.car_amenities.map((amenity) =>
            <div className="form-check col-md-3" key={amenity.id}>
                <input
                    type="checkbox"
                    value={amenity.id}
                    checked={this.state.trip_amenity_ids.has(amenity.id)}
                    onChange={this.handleAmenityTypeChange}
                />
                <label className="form-check-label">
                    {amenity.type}
                </label>
            </div>)
        let booking_details = this.state.booking_details ?
            (<BookingInfo {...this.state.booking_details}/>) : "";
        return (
            <div className="row">
                <div className="col-md-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="origin">Start Address</label>
                            <input type="text" className="form-control" id="origin" placeholder="origin" name="origin" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="destination">End Address</label>
                            <input type="text" className="form-control" id="destination" placeholder="destination" name="destination" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start_date">Trip Date</label>
                            <input type="date" className="form-control" id="start-date" onChange={this.handleStartDateChange} value={start_date} name="start_date" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="start_hour" className="col-md-5 col-form-label">Start Time (HH:MM) :</label>
                            <div className="form-group col-md-2">
                                <input type="number" id="start-hour" name="start_hour" min="0" max="23" placeholder="HH" onChange={this.handleTimeChange} value={start_hour} pattern="[0-9]{2}" className="form-control" required />
                            </div>
                            {/* <label class="col-md-1 col-form-label">:</label> */}
                            <div className="form-group col-md-2">
                                <input type="number" id="start-min" name="start_min" min="00" max="59" placeholder="MM" onChange={this.handleTimeChange} value={start_min} className="form-control" />
                            </div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="end_hour" className="col-md-5 col-form-label">End Time (HH:MM) :</label>
                            <div className="form-group col-md-2">
                                <input type="number" id="end-hour" name="end_hour" min="0" max="23" placeholder="HH" onChange={this.handleTimeChange} value={end_hour} className="form-control" />
                            </div>
                            {/* <label class="col-md-1 col-form-label">:</label> */}
                            <div className="form-group col-md-2">
                                <input type="number" id="end-min" name="end_min" min="00" max="59" placeholder="MM" onChange={this.handleTimeChange} value={end_min} className="form-control" />
                            </div>
                        </div>
                        <div className="form-row">
                            {/* <div className="form-group"> */}
                            {car_type_list}
                            {/* </div> */}
                        </div>
                        <div className="form-row">
                            {amenity_types}
                        </div>
                        <div className="form-row">
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Book</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-5">
                    {booking_details}
                </div>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`}
                    onLoad={this.handleScriptLoad}
                />
                <ToastContainer autoClose={2000} />
            </div>
        )
    }
}

export default BookingForm;