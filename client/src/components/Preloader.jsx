import React, { Component } from "react";
import "./Preloader.css";

class Preloader extends Component {
  render() {
    return (
      <div className="lds-spinner-wrapper">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Preloader;
