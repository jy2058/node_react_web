// import React from "react";
import React, { useEffect, Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);
  return <div>LandingPage sfsf</div>;
}

export default withRouter(LandingPage);
