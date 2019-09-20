import React, { Component } from "react";
import { Link } from 'react-router-dom';




class DriverRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: props.driver.first_name,
            last_name: props.driver.last_name,
            id: props.driver.id,
            contact: props.driver.contact,
            active: props.driver.active,
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
            first_name: props.driver.first_name,
            last_name: props.driver.last_name,
            id: props.driver.id,
            contact: props.driver.contact,
            active: props.driver.active,
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
        this.props.handleUpdate(this.state.id,payload);
        this.setState({
            editMode:false
        });
            
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        let { first_name, last_name, id, editMode, active, contact } = this.state;
        return (
            <tr>
                <td>{id}</td>
                <td>{editMode ? <input className="form-control" type="text" value={first_name} name="first_name" onChange={this.handleInputChange} /> : first_name}</td>
                <td>{editMode ? <input className="form-control" type="text" value={last_name} name="last_name" onChange={this.handleInputChange} /> : last_name}</td>
                <td>{editMode ? <input className="form-control" type="text" value={active} name="active" onChange={this.handleInputChange} /> : active}</td>
                <td>{editMode ? <input className="form-control" type="text" value={contact} name="contact" onChange={this.handleInputChange} /> : contact}</td>
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
                <td><Link to={`/drivers/${id}/shifts`}><button type="button" className="btn btn-success" onClick={this.handleEdit}>Add/Edit</button></Link></td>
                <td><Link to={`/drivers/${id}/cars`}><button type="button" className="btn btn-success" onClick={this.handleEdit}>Add/Edit</button></Link></td>
            </tr>
        )
    }
}

export default DriverRow;