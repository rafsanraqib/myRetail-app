import React, { Component } from "react";
import { Button } from "react-bootstrap";
import methods from "../Backend/server.js";

class TextField extends Component {
  state = { product_key: "", data: [] };

  handleUserInput = productID => {
    var product_key = productID;
    this.setState({ product_key: product_key });
  };

  sendRequest = key => {
    // Backend method call

    methods.manageGetRequest(key);
  };

  render() {
    return (
      <div className="input-group w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Enter product Id"
          onChange={e => this.handleUserInput(e.target.value)}
        ></input>
        <div className="container">
          <Button onClick={e => this.sendRequest(this.state.product_key)}>
            Look up
          </Button>
        </div>
      </div>
    );
  }
}

export default TextField;
