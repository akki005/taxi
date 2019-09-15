import React, { Component } from "react";

class EventBind extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "Hello"
        }
        //alternate way of binding
        // good for performance as it binds only once in constructor
        // this.handleClick=this.handleClick.bind(this);
    }
    /**
     * this is an experimental feature
     */
    handleClick = () => {
        this.setState({
            message: "good"
        })
    }
    render() {
        return (
            <div>
                <div>{this.state.message}</div>
                <button onClick={this.handleClick}>Click</button>
                {/* 
                    Performance issues in both the approach below as they bind each time a function is executed
                */}
                {/* alternate way 
                    <button onClick={()=>this.handleClick()}>Click</button>
                */}
                {/* alternate way
                    <button onClick={this.handleClick.bind(this)}>Click</button>
                */}
            </div>
        )
    }
}

export default EventBind;