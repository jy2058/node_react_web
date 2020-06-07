// import React from "react";
import React, { useEffect } from "react";
import axios from "axios";

console.log("landing 1");

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);
  return <div>LandingPage sfsf</div>;
}
console.log("a");

export default LandingPage;
