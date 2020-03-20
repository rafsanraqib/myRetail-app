import React, { Component } from "react";
import { Button } from "react-bootstrap";
import methods from "../Backend/server";
class UpdatePrice extends Component {
  state = { product_id: "", new_price: 0 };

  setProductID = product_id_ => {
    var product_id = product_id_;
    this.setState({ product_id: product_id });
  };

  setNewPrice = new_price_ => {
    var new_price = new_price_;
    this.setState({ new_price: new_price });
  };

  initiatePutRequest = () => {
    methods.managePutRequest(this.state.product_id, this.state.new_price);
  };
  render() {
    return (
      <div className="input-group w-25">
        <input
          type="text"
          className="form-control"
          placeholder="enter product id"
          onChange={e => this.setProductID(e.target.value)}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="enter new price"
          onChange={e => this.setNewPrice(e.target.value)}
        ></input>
        <div className="container">
          <Button onClick={e => this.initiatePutRequest()}>Update</Button>
        </div>
      </div>
    );
  }
}

export default UpdatePrice;
