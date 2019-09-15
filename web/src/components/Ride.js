

import React, { Component } from 'react';
import BookingForm from './BookingForm';
// import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
class Ride extends Component {
  render() {
    return (
      <div className="container ride-container">
        <BookingForm/>
      </div>
    );
  }
}
export default Ride;
