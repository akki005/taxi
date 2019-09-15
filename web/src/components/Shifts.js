import React from 'react'
import axios from "axios";
import ShiftAdd from './ShiftAdd';

class Shifts extends React.Component {

    constructor(props) {
        super(props);
        this.driver_id = props.match.params.id;
        console.log(this.driver_id);
        this.state = {
            shifts: []
        }
    }

    componentDidMount = () => {
        this.fetchShifts()
    }

    fetchShifts = () => {
        axios.get(`http://localhost:3001/drivers/${this.driver_id}/shifts`)
            .then((response) => {
                this.setState({
                    shifts: response.data,
                })
            }).catch((error) => {
                console.log(error);
            })
    }


    render() {
        let { shifts } = this.state;
        let shifts_list = shifts.map((shift) =>
            <tr key={shift.id}>
                <td>{shift.WeekDay.day}</td>
                <td>{shift.start}</td>
                <td>{shift.end}</td>
            </tr>
        );
        return (
            <div className="row">
                <div className="col-md-6">
                    <table className="table drivers-table" style={{margin: "auto",marginTop: "20%"}}>
                        <caption>Shifts</caption>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shifts_list}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <ShiftAdd driver_id={this.driver_id} fetchShifts={this.fetchShifts} />
                </div>
            </div>
        )
    }
}
export default Shifts