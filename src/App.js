import { React, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import gif1 from "./assets/gif1.gif";
import gif2 from "./assets/gif2.gif";
import gif3 from "./assets/gif3.gif";
import gif4 from "./assets/gif4.gif";
import arrow from "./assets/arrow.svg";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/screen">
            <Screen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// in your app.

function MenuItem(item) {
  return (
    <div
      style={{
        cursor: "pointer",
        borderBottom: "1px solid rgba(0, 0, 0, .3)",
        height: "120px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "35px 35px 28px 20px",
      }}
      onClick={() => {
        axios.post(`/selectedImage`, { id: 1 });
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontWeight: 400,
            fontSize: "22px",
            letterSpacing: "0.02em",
          }}
        >
          {item.name}
        </span>
        <img src={arrow} width="32px" height="auto" />
      </div>
      <span
        style={{
          width: "65%",
          fontWeight: 300,
          fontSize: "16px",
          letterSpacing: "0.03em",
        }}
      >
        {item.summery}
      </span>
    </div>
  );
}

function Home() {
  return (
    <div
      style={{
        fontFamily: "Space Grotesk",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          fontWeight: 500,
          fontSize: "14px",
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          margin: "20px 0",
        }}
      >
        <div width>Day menu</div>
        <div>/</div>
        <div>Night menu</div>
      </div>
      <div
        style={{
          borderBottom: "1px solid black",
          padding: "45px 20px",
          fontWeight: 400,
          fontSize: "32px",
        }}
      >
        Your daily dose of desire has arrived.
      </div>
      {menuItems.map((item) => MenuItem(item))}
    </div>
  );
}

function Screen() {
  const [num, setNum] = useState(1);

  useEffect(() => {
    const id = setInterval(myfunc, 200);
    return () => clearInterval(id);
  }, []);

  const myfunc = async () => {
    await axios.get("/selectedImage").then((res) => {
      setNum(res.data.id);
    });
  };

  const getGif = (num) => {
    switch (num) {
      case 1:
        return gif1;
      case 2:
        return gif2;
      case 3:
        return gif3;
      case 4:
        return gif4;
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%", textAlign: "center" }}>
      <img src={getGif(num)} alt="" width="100%" height="auto" />
    </div>
  );
}

const menuItems = [
  {
    name: "Take a breath",
    summery: "Relaxing, sweet, juicy and luckewarm",
  },
  {
    name: "take a breath",
    summery: "Relaxing, sweet, juicy and luckewarm",
  },
  {
    name: "take a breath",
    summery: "Relaxing, sweet, juicy and luckewarm",
  },
  {
    name: "take a breath",
    summery: "Relaxing, sweet, juicy and luckewarm",
  },
  {
    name: "take a breath",
    summery: "Relaxing, sweet, juicy and luckewarm",
  },
];
