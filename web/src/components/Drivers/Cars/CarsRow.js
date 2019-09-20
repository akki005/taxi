import React, { Component } from "react";
import { Link } from 'react-router-dom';




class CarsRow extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: props.car.id,
            model_name: props.car.model_name,
            active: props.car.active,
            car_type: props.car.car_type,
            active: props.car.active,
            amenities: props.car.amenities,
            editMode: false
        }
    }

    handleEdit = (event) => {
        this.setState((prev_state) => ({
            editMode: !prev_state.editMode
        }))
    }

    handleCancel = () => {
        this.setState((prev_state, props) => ({
            id: props.car.id,
            model_name: props.car.model_name,
            active: props.car.active,
            car_type: props.car.car_type,
            active: props.car.active,
            amenities: props.car.amenities,
            editMode: false
        }))
    }

    handleSave = () => {
        let payload = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            active: this.state.active,
            contact: this.state.contact,
        }
        this.props.handleUpdate(this.state.id, payload);
        this.setState({
            editMode: false
        });

    }

    handleInputChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        let { id, model_name, car_type, active, editMode, amenities } = this.state;

        let amenities_list = amenities.map((amenity) =><li key={amenity.id}>{amenity.type} </li>);
        // console.log(amenities_list);
        // amenities_list=amenities_list.join(",");
        return (
            <tr>
                <td>{id}</td>
                <td>{editMode ? <input className="form-control" type="text" value={model_name} name="model_name" onChange={this.handleInputChange} /> : model_name}</td>
                <td>{editMode ? <input className="form-control" type="text" value={active} name="active" onChange={this.handleInputChange} /> : active}</td>
                <td>{editMode ? <input className="form-control" type="text" value={car_type.id} name="car_type" onChange={this.handleInputChange} /> : car_type.type}</td>
                <td>
                    <ul>
                    {amenities_list}
                    </ul>
                </td>
                <td>
                    {
                        editMode ? (
                            <div>
                                <button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>{" "}
                                <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
                            </div>)
                            : <button type="button" className="btn btn-success" onClick={this.handleEdit}>Edit</button>
                    }
                </td>
                {/*  <td><Link to={`/drivers/${id}/shifts`}><button type="button" className="btn btn-success" onClick={this.handleEdit}>Add/Edit</button></Link></td>
                <td><Link to={`/drivers/${id}/cars`}><button type="button" className="btn btn-success" onClick={this.handleEdit}>Add/Edit</button></Link></td> */}
            </tr>
        )
    }
}

export default CarsRow;