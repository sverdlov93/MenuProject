import { React, useState, useEffect, createRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import gif1 from "./assets/gif1.gif";
import gif2 from "./assets/gif2.gif";
import gif3 from "./assets/gif3.gif";
import gif4 from "./assets/gif4.gif";
import arrow from "./assets/arrow.svg";
import plus from "./assets/plus.svg";
import arrowLeft from "./assets/arrowLeft.svg";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Menu />
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

function Menu() {
  const [isDay, setIsDay] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const selectedMenu = menuItems[isDay ? "day" : "night"];

  function MenuItem(item, index) {
    return (
      <div
        key={index}
        style={{
          cursor: "pointer",
          borderBottom: `1px solid rgba(${
            isDay ? "0,0,0" : "255,255,255"
          }, .3)`,
          height: "120px",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "35px 35px 28px 20px",
          backgroundColor: selectedItem == index ? "#90D2DA" : "",
        }}
        onClick={() => {
          setSelectedItem(index);
          setTimeout(() => {
            axios.post(`/selectedImage`, { id: index });
            setIsSelected(true);
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

  function SelectDayNight() {
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

  function GetFooter() {
    return (
      <div
        style={{
          display: "flex",
          width: "-webkit-fill-available",
          position: "absolute",
          padding: "23px 19px",
          bottom: 0,
          backgroundColor: isDay ? "white" : "black",
          justifyContent: !isSelected ? "space-between" : "center",
          borderTop: `1px solid  ${isDay ? "black" : "white"}`,
        }}
        onClick={() => setSelectedItem(undefined)}
      >
        {isSelected ? (
          <img
            src={arrowLeft}
            width="5"
            height="auto"
            style={{ marginRight: "13px" }}
          />
        ) : undefined}
        <span
          style={{
            fontSize: "18px",
            fontWeight: "400",
            letterSpacing: "0.02em",
          }}
        >
          {isSelected ? "Your next desire" : "Create your own desire"}
        </span>
        {!isSelected ? (
          <img src={plus} width="19px" height="auto" />
        ) : undefined}
      </div>
    );
  }

  function GetMenuItems() {
    return (
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
        {selectedMenu.items.map((item, index) => MenuItem(item, index))}
      </div>
    );
  }

  function SelectedItem() {
    function getSelection(key, value) {
      return (
        <div
          style={{
            margin: "50px 0 0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontWeight: "300",
              fontSize: "16px",
              opacity: 0.7,
              letterSpacing: "0.04em",
              textTransform: "capitalize",
            }}
          >
            {key}:
          </span>
          <span
            style={{
              fontWeight: "400",
              fontSize: "24px",
              letterSpacing: "0.03em",
              textTransform: "capitalize",
            }}
          >
            {value}
          </span>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "120px 0 45px 20px",
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid black",
          }}
        >
          <span
            style={{
              fontWeight: "300",
              fontSize: "16px",
              opacity: 0.7,
              letterSpacing: "0.04em",
            }}
          >
            Your chosen desire:
          </span>
          <span
            style={{
              fontWeight: "300",
              fontSize: "16px",
              opacity: 0.7,
              letterSpacing: "0.04em",
            }}
            style={{
              fontWeight: "400",
              fontSize: "32px",
              letterSpacing: "0.03em",
            }}
          >
            {selectedMenu.items[selectedItem].desire}
          </span>
        </div>
        {getSelection("taste", selectedMenu.items[selectedItem].taste)}
        {getSelection("texture", selectedMenu.items[selectedItem].texture)}
        {getSelection("temp", selectedMenu.items[selectedItem].temp)}
        {getSelection("size", selectedMenu.items[selectedItem].size)}
      </div>
    );
  }

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
      {!isSelected ? (
        <>
          {SelectDayNight()}
          {GetMenuItems()}
        </>
      ) : (
        SelectedItem()
      )}
      {GetFooter()}
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
        summery: "Relaxing, sweet, juicy and lukewarm light meal",
        desire: "Relaxing",
        taste: "sweet",
        texture: "juicy",
        temp: "lukewarm",
        size: "light meal",
      },
      {
        name: "Hit refresh",
        summery: "Refreshing, salty, dense and cold light meal",
        desire: "Refreshing",
        taste: "salty",
        texture: "dense",
        temp: "cold",
        size: "light meal",
      },
      {
        name: "Wake me up",
        summery: "Stimulating, bitter, liquid and hot light meal",
        desire: "Stimulating",
        taste: "bitter",
        texture: "liquid",
        temp: "hot",
        size: "light meal",
      },
      {
        name: "Chasing thrills",
        summery: "Surprising, spicy, dry and hot meal",
        desire: "Surprising",
        taste: "spicy",
        texture: "dry",
        temp: "hot",
        size: "meal",
      },
      {
        name: "Junk urges",
        summery: "Junk food, umami, gummy and lukewarm meal",
        desire: "Junk food",
        taste: "umami",
        texture: "gummy",
        temp: "lukewarm",
        size: "meal",
      },
      {
        name: "Warm my heart",
        summery: "Comforting, salty, soft and warm appetizer",
        desire: "Comforting",
        taste: "salty",
        texture: "soft",
        temp: "warm",
        size: "appetizer",
      },
      {
        name: "Feel the love",
        summery: "Emotional, umami, doughy and warm meal",
        desire: "Emotional",
        taste: "umami",
        texture: "doughy",
        temp: "warm",
        size: "meal",
      },
      {
        name: "Looking for a snack",
        summery: "Snacking, sweet, crunchy and lukewarm appetizer",
        desire: "Snacking",
        taste: "sweet",
        texture: "crunchy",
        temp: "lukewarm",
        size: "appetizer",
      },
    ],
  },
  night: {
    headline: "Night cravings?\nWe got you.",
    items: [
      {
        name: "Junk urges",
        summery: "Junk food, umami, gummy, lukewarm, meal",
        desire: "Junk food",
        taste: "umami",
        texture: "gummy",
        temp: "lukewarm",
        size: "meal",
      },
      {
        name: "Warm my heart",
        summery: "Comforting, salty, soft, warm, appetizer",
        desire: "Comforting",
        taste: "salty",
        texture: "soft",
        temp: "warm",
        size: "appetizer",
      },
      {
        name: "Chasing thrills",
        summery: "Surprising, sour, juicy, freezing, bite",
        desire: "Surprising",
        taste: "sour",
        texture: "juicy",
        temp: "freezing",
        size: "bite",
      },
      {
        name: "Looking for a snack",
        summery: "Snacking, salty, dry, hot, bite",
        desire: "Snacking",
        taste: "salty",
        texture: "dry",
        temp: "hot",
        size: "bite",
      },
      {
        name: "Take a breath",
        summery: "Relaxing, bitter, liquid, hot, light meal",
        desire: "Relaxing",
        taste: "bitter",
        texture: "liquid",
        temp: "hot",
        size: "light meal",
      },
      {
        name: "Need a hug",
        summery: "Comforting, bitter, hard, cold, appetizer",
        desire: "Comforting",
        taste: "bitter",
        texture: "hard",
        temp: "cold",
        size: "appetizer",
      },
      {
        name: "Feel the love",
        summery: "Emotional, sweet, doughy, warm, appetizer",
        desire: "Emotional",
        taste: "sweet",
        texture: "doughy",
        temp: "warm",
        size: "appetizer",
      },
      {
        name: "Get my satisfaction",
        summery: "Junk food, sweet, soft, freezing, appetizer",
        desire: "Junk food",
        taste: "sweet",
        texture: "soft",
        temp: "freezing",
        size: "appetizer",
      },
    ],
  },
};
