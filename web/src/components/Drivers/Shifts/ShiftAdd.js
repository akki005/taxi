import React from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


class ShiftAdd extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.driver_id = props.driver_id;
        this.state = {
            shifts_days: [],
            start_hour: 0,
            end_hour: 0,
            start_min: 0,
            end_min: 0,
            selected_shift_day: undefined
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3001/weekdays`)
            .then((response) => {
                this.setState({
                    shifts_days: response.data,
                    selected_shift_day: response.data[0].id
                })
            }).catch((error) => {
                console.log(error);
            })
    }

    handleTimeChange = event => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    };

    handleDayChange = event => {
        console.log(event.target.value);
        this.setState({
            selected_shift_day: event.target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault();
        let shift_data = {
            "day": Number(this.state.selected_shift_day),
            "start": `${this.state.start_hour}:${this.state.start_min}`,
            "end": `${this.state.end_hour}:${this.state.end_min}`
        }
        console.log(shift_data, this.driver_id);
        axios.post(`http://localhost:3001/drivers/${this.driver_id}/shifts`, shift_data).then((response) => {
            console.log(response.data);
            toast.success(response.data.message);
            this.props.fetchShifts();
        }).catch((error) => {
            let status = error.response.status;
            let message = error.response.data.message;
            console.log(status, message);
            if (error.response) {
                toast.warn(message)
            } else if (error.request) {
                toast.error(error.response.data.message)
            } else {
                toast.error(error.response.data.message)
            }
        })

    }


    render() {
        let { shifts_days, start_hour, start_min, end_hour, end_min } = this.state;
        let shifts_days_list = shifts_days.map((day) =>
            <option key={day.id} value={day.id}>{day.day}</option>
        );
        return (
            <div className="shift-add-form">
                <h2>Add Shift</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <label className="col-md-3 col-form-label">End Time (HH:MM) :</label>
                        <div className="form-group col-md-2">
                            <input type="number" id="start-hour" name="start_hour" min="0" max="23" placeholder="HH" onChange={this.handleTimeChange} value={start_hour} className="form-control" />
                        </div>
                        <div className="form-group col-md-2">

                            <input type="number" id="start-min" name="start_min" min="00" max="59" placeholder="MM" onChange={this.handleTimeChange} value={start_min} className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="col-md-3 col-form-label">End Time (HH:MM) :</label>
                        <div className="form-group col-md-2">
                            <input type="number" id="end-hour" name="end_hour" min="0" max="23" placeholder="HH" onChange={this.handleTimeChange} value={end_hour} className="form-control" />
                        </div>
                        <div className="form-group col-md-2">
                            <input type="number" id="end-min" name="end_min" min="00" max="59" placeholder="MM" onChange={this.handleTimeChange} value={end_min} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control col-md-4" value={this.state.selected_shift_day} onChange={this.handleDayChange}>
                            {shifts_days_list}
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
                </form>
                <ToastContainer autoClose={2000} />
            </div>
        )
    }
}
export default ShiftAdd