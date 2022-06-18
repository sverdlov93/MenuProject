import { React, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import gif1 from "./assets/gif1.gif";
import gif2 from "./assets/gif2.gif";
import gif3 from "./assets/gif3.gif";
import gif4 from "./assets/gif4.gif";
import arrow from "./assets/arrow.svg";
import plus from "./assets/plus.svg";

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

function MenuItem(item, isDay) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      style={{
        cursor: "pointer",
        borderBottom: `1px solid rgba(${isDay ? "0,0,0" : "255,255,255"}, .3)`,
        height: "120px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "35px 35px 28px 20px",
        backgroundColor: isSelected ? "#90D2DA" : "",
      }}
      onClick={() => {
        setIsSelected(true);
        setTimeout(() => {
          axios.post(`/selectedImage`, { id: 1 });
          setIsSelected(false);
        }, 3000);
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
  const [isDay, setIsDay] = useState(true);
  const selectedMenu = menuItems[isDay ? "day" : "night"];
  return (
    <div
      style={{
        fontFamily: "Space Grotesk",
        color: isDay ? "black" : "white",
        backgroundColor: isDay ? "white" : "black",
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      {SelectDayNight(isDay, setIsDay)}
      {CreateYourOwn(isDay)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            borderBottom: `1px solid  ${isDay ? "black" : "white"}`,
            padding: "45px 20px",
            fontWeight: 400,
            fontSize: "32px",
            width: "-webkit-fill-available",
            whiteSpace: "pre-wrap",
          }}
        >
          {selectedMenu.headline}
        </div>
        {selectedMenu.items.map((item) => MenuItem(item, isDay))}
      </div>
    </div>
  );
}

function SelectDayNight(isDay, setIsDay) {
  return (
    <div
      style={{
        fontWeight: 500,
        fontSize: "14px",
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        position: "absolute",
        padding: "20px 0",
        top: 0,
        backgroundColor: isDay ? "white" : "black",
      }}
    >
      <span
        style={{ pointer: "cursor", opacity: isDay ? 1 : 0.3 }}
        onClick={() => setIsDay(true)}
      >
        Day menu
      </span>
      <span>/</span>
      <span
        style={{ pointer: "cursor", opacity: !isDay ? 1 : 0.3 }}
        onClick={() => setIsDay(false)}
      >
        Night menu
      </span>
    </div>
  );
}

function CreateYourOwn(isDay) {
  return (
    <div
      style={{
        display: "flex",
        width: "-webkit-fill-available",
        position: "absolute",
        padding: "23px 19px",
        bottom: 0,
        backgroundColor: isDay ? "white" : "black",
        justifyContent: "space-between",
        borderTop: `1px solid  ${isDay ? "black" : "white"}`,
      }}
    >
      <span fontSize="18px" fontWeight="400" letterSpacing="0.02em">
        Create your own desire
      </span>
      <img src={plus} width="19px" height="auto" />
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

const menuItems = {
  day: {
    headline: "Your daily dose of desire has arrived.",
    items: [
      {
        name: "Take a breath",
        summery: "Relaxing, sweet, juicy and luckewarm",
      },
      {
        name: "Hit refresh",
        summery: "Relaxing, sweet, juicy and luckewarm",
      },
      {
        name: "Wake me up",
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
    ],
  },
  night: {
    headline: "Night cravings?\nWe got you.",
    items: [
      {
        name: "Take a breath",
        summery: "Relaxing, sweet, juicy and luckewarm",
      },
      {
        name: "Hit refresh",
        summery: "Relaxing, sweet, juicy and luckewarm",
      },
      {
        name: "Wake me up",
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
    ],
  },
};
