import React from "react";
import pattern from "../../../img/pattern.jpeg";
import Wedge from "../../common/Wedge";
import Skills from "./Skills";

const AboutContainer = () => {
  return (
    <div className="about">
      {/* Banner */}
      <div className="imgContainer">
        <img src={pattern} alt="" />
      </div>
      {/* Wedge */}

      {/* Bio */}
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="display-3">
                Jack
                <br />
                McGregor
              </div>
            </div>
            <div className="col-md-7 offset-md-1">
              <div className="h1">Dev. Artist. Idiot.</div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="container">
            <div className="row py-5">
              <div className="col-md-6" />
              <div className="col-md-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  dolores pariatur nam voluptates velit suscipit quasi quia unde
                  alias cupiditate natus, vero, dignissimos consequatur
                  asperiores minus inventore ad repellendus voluptatem.
                </p>
                <br />
                <p>
                  Dignissimos consequatur asperiores minus inventore ad
                  repellendus voluptatem.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="container">
            <div className="row py-5">
              <div className="col-md-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  dolores pariatur nam voluptates velit suscipit quasi quia unde
                  alias cupiditate natus, vero, dignissimos consequatur
                  asperiores minus inventore ad repellendus voluptatem.
                </p>
                <br />
                <p>Dignissimos consequatur.</p>
              </div>
              <div className="col-md-6" />
            </div>
          </div>
        </div>
      </div>
      {/* Languages carousel */}
      <div className="container-fluid">
        <Skills />
      </div>
      {/* Experience */}
      {/* Education */}
    </div>
  );
};

export default AboutContainer;
