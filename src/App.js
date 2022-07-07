import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import arrow from "./assets/arrow.svg";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowNight from "./assets/arrowNight.svg";
import arrowLeftNight from "./assets/arrowLeftNight.svg";

import plus from "./assets/plus.svg";
import plusNight from "./assets/plusNight.svg";

import crunchyVector from "./assets/Crunchy.svg";
import denseVector from "./assets/Dense2.svg";
import doughyVector from "./assets/Doughy.svg";
import dryVector from "./assets/Dry.svg";
import gummyVector from "./assets/Gummy.svg";
import hardVector from "./assets/Hard.svg";
import juicyVector from "./assets/Juicy.svg";
import liquidVector from "./assets/Liquid.svg";
import softVector from "./assets/Soft.svg";

import waiting from "./assets/videos/waiting.mp4";
import Day1 from "./assets/videos/Day1.mp4";
import Day2 from "./assets/videos/Day2.mp4";
import Day3 from "./assets/videos/Day3.mp4";
import Day4 from "./assets/videos/Day4.mp4";
import Day5 from "./assets/videos/Day5.mp4";
import Day6 from "./assets/videos/Day6.mp4";
import Day7 from "./assets/videos/Day7.mp4";
import Day8 from "./assets/videos/Day8.mp4";
import Night1 from "./assets/videos/Night1.mp4";
import Night2 from "./assets/videos/Night2.mp4";
import Night3 from "./assets/videos/Night3.mp4";
import Night4 from "./assets/videos/Night4.mp4";
import Night5 from "./assets/videos/Night5.mp4";
import Night6 from "./assets/videos/Night6.mp4";
import Night7 from "./assets/videos/Night7.mp4";
import Night8 from "./assets/videos/Night8.mp4";

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
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [chooseType, setChooseType] = useState(undefined);
  const [selectedTaste, setSelectedTaste] = useState(undefined);
  const selectedMenu = menuItems[isDay ? "day" : "night"];

  function MenuItem(item, index) {
    return (
      <div
        style={{ padding: "0 20px" }}
        onClick={(e) => {
          e.currentTarget.style.backgroundColor = item.color;
          setTimeout(() => {
            axios.post(`/selectedImage`, { id: isDay ? index : index + 10 });
            setSelectedItem(index);

            const id = setInterval(async () => {
              await axios.get("/selectedImage").then((res) => {
                if (res.data.id == -1) {
                  clearInterval(id);
                  setSelectedItem(undefined);
                }
              });
            }, 5000);
          }, 1000);
        }}
      >
        <div
          key={index}
          style={{
            cursor: "pointer",
            borderBottom: `1px solid rgba(${
              isDay ? "0,0,0" : "255,255,255"
            }, .3)`,
            height: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "35px 0 28px 0",
            width: "-webkit-fill-available",
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
            <img src={isDay ? arrow : arrowNight} width="32px" height="auto" />
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
    const isSelected = selectedItem != undefined;
    return (
      chooseType == undefined && (
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
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={
            isSelected
              ? () => {
                  setSelectedItem(undefined);
                  axios.post(`/selectedImage`, { id: -1 });
                }
              : () => setChooseType(0)
          }
        >
          {isSelected ? (
            <img
              src={isDay ? arrowLeft : arrowLeftNight}
              style={{ height: "16px", width: "8px", marginRight: "13px" }}
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
            <img src={isDay ? plus : plusNight} width="19px" height="auto" />
          ) : undefined}
        </div>
      )
    );
  }

  function GetHeader() {
    return (
      <div
        style={{
          display: "flex",
          width: "-webkit-fill-available",
          position: "absolute",
          padding: "23px 19px",
          top: 0,
          backgroundColor: isDay ? "white" : "black",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={isDay ? arrowLeft : arrowLeftNight}
          style={{ marginRight: "13px", height: "16px", width: "8px" }}
          onClick={() =>
            setChooseType(chooseType == 0 ? undefined : chooseType - 1)
          }
        />
        {GetDots(chooseType, isDay)}
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
        <div style={{ height: "70px" }}></div>
      </div>
    );
  }

  function ChooseYourOwn() {
    function Cell(item, span) {
      return (
        <td
          key={item}
          rowSpan={span?.rowSpan}
          colSpan={span?.colSpan}
          style={{
            backgroundColor: selectedTaste == item ? color[item] : "",
            width: types[chooseType] == "texture" ? "115px" : "2000px",
            border: `1px solid  ${isDay ? "black" : "white"}`,
          }}
          onClick={() => {
            setSelectedTaste(item);
            setTimeout(() => {
              setChooseType(chooseType + 1);
              setSelectedTaste(undefined);
            }, 1000);
          }}
        >
          {types[chooseType] == "taste" && (
            <div
              style={{
                position: "absolute",
                width: item == "Bitter" || item == "Umami" ? "80%" : "100%",
                height: item == "Bitter" || item == "Umami" ? "80%" : "100%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {getVectorSvg(
                item,
                selectedTaste == item ? color[`${item}2`] : "none"
              )}
            </div>
          )}
          {types[chooseType] == "texture" && (
            <img
              src={getTexture(item)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
          <span style={{ position: "relative" }}>{item}</span>
        </td>
      );
    }
    function GetTable() {
      if (chooseType > types.length - 1) {
        setChooseType(undefined);
        setSelectedItem(isDay ? 6 : 7);
        axios.post(`/selectedImage`, { id: isDay ? 6 : 17 });
      }
      switch (types[chooseType]) {
        case "desire":
          return (
            <tbody>
              <tr>
                {Cell("Surprising")}
                {Cell("Stimulating")}
              </tr>
              <tr>
                {Cell("Emotional")}
                {Cell("Refreshing")}
              </tr>
              <tr>
                {Cell("Snacking")}
                {Cell("Relaxing")}
              </tr>
              <tr>
                {Cell("Comforting")}
                {Cell("Junk food")}
              </tr>
            </tbody>
          );
        case "taste":
          return (
            <tbody>
              <tr>
                {Cell("Sweet")}
                {Cell("Salty")}
              </tr>
              <tr>
                {Cell("Bitter")}
                {Cell("Spicy")}
              </tr>
              <tr>
                {Cell("Umami")}
                {Cell("Sour")}
              </tr>
            </tbody>
          );
        case "texture":
          return (
            <tbody>
              <tr>
                {Cell("Liquid")}
                {Cell("Juicy")}
                {Cell("Soft")}
              </tr>
              <tr>
                {Cell("Doughy")}
                {Cell("Gummy")}
                {Cell("Dense")}
              </tr>
              <tr>
                {Cell("Dry")}
                {Cell("Crunchy")}
                {Cell("Hard")}
              </tr>
            </tbody>
          );
        case "temperature":
          return (
            <tbody>
              <tr style={{ fontWeight: 700 }}>{Cell("Hot")}</tr>
              <tr style={{ fontWeight: 600 }}>{Cell("Warm")}</tr>
              <tr style={{ fontWeight: 400 }}>{Cell("Lukewarm")}</tr>
              <tr style={{ fontWeight: 400 }}>{Cell("Cold")}</tr>
              <tr style={{ fontWeight: 300 }}>{Cell("Freezing")}</tr>
            </tbody>
          );
        case "size":
          return (
            <tbody>
              <tr height={"50%"}>{Cell("Meal", { colSpan: 3 })}</tr>
              <tr>
                {Cell("Appetizer")}
                {Cell("Lightmeal", { rowSpan: 2 })}
              </tr>
              <tr height="20%">{Cell("Bite")}</tr>
            </tbody>
          );
      }
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px",
        }}
      >
        <span
          style={{
            fontWeight: "400",
            fontSize: "28px",
            letterSpacing: "-0.3",
            marginTop: "100px",
          }}
        >
          Choose your {types[chooseType]}
        </span>
        <table
          style={{
            boxShadow: `0 0 0 1px ${isDay ? "black" : "white"}`,
          }}
        >
          {GetTable()}
        </table>
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
            padding: "100px 0 45px 20px",
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
      {selectedItem != undefined ? (
        SelectedItem()
      ) : chooseType != undefined ? (
        <>
          {ChooseYourOwn()}
          {GetHeader()}
        </>
      ) : (
        <>
          {SelectDayNight()}
          {GetMenuItems()}
        </>
      )}
      {GetFooter()}
    </div>
  );
}

function Screen() {
  const [num, setNum] = useState(-1);
  const vidRef = useRef(null);

  useEffect(() => {
    const id = setInterval((num) => myfunc(num), 1000);
    return () => clearInterval(id);
  }, [num]);

  const myfunc = async () => {
    await axios.get("/selectedImage").then((res) => {
      vidRef?.current?.play();
      if (res.data.id != num) {
        setNum(res.data.id);
      }
    });
  };

  const getVideo = () => {
    switch (num) {
      case 0:
        return Day1;
      case 1:
        return Day2;
      case 2:
        return Day3;
      case 3:
        return Day4;
      case 4:
        return Day5;
      case 5:
        return Day6;
      case 6:
        return Day7;
      case 7:
        return Day8;
      case 10:
        return Night1;
      case 11:
        return Night2;
      case 12:
        return Night3;
      case 13:
        return Night4;
      case 14:
        return Night5;
      case 15:
        return Night6;
      case 16:
        return Night7;
      case 17:
        return Night8;
      default:
        return waiting;
    }
  };
  return (
    <div style={{ height: "100vh", width: "100v", overflow: "hidden" }}>
      <video
        key={num}
        style={{ objectFit: "fill", width: "100%", height: "100%" }}
        ref={vidRef}
        onEnded={
          num != -1 ? () => axios.post(`/selectedImage`, { id: -1 }) : undefined
        }
      >
        <source src={getVideo()} type="video/mp4" />
      </video>
    </div>
  );
}
const types = ["desire", "taste", "texture", "temperature", "size"];
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
        color: "#90D2DA",
      },
      {
        name: "Hit refresh",
        summery: "Refreshing, salty, dense and cold light meal",
        desire: "Refreshing",
        taste: "salty",
        texture: "dense",
        temp: "cold",
        size: "light meal",
        color: "#B4EFD5",
      },
      {
        name: "Wake me up",
        summery: "Stimulating, bitter, liquid and hot light meal",
        desire: "Stimulating",
        taste: "bitter",
        texture: "liquid",
        temp: "hot",
        size: "light meal",
        color: "#FF6434",
      },
      {
        name: "Chasing thrills",
        summery: "Surprising, spicy, dry and hot meal",
        desire: "Surprising",
        taste: "spicy",
        texture: "dry",
        temp: "hot",
        size: "meal",
        color: "#AC8AEE",
      },
      {
        name: "Junk urges",
        summery: "Junk food, umami, gummy and lukewarm meal",
        desire: "Junk food",
        taste: "umami",
        texture: "gummy",
        temp: "lukewarm",
        size: "meal",
        color: "#FF6434",
      },
      {
        name: "Warm my heart",
        summery: "Comforting, salty, soft and warm appetizer",
        desire: "Comforting",
        taste: "salty",
        texture: "soft",
        temp: "warm",
        size: "appetizer",
        color: "#E5C892",
      },
      {
        name: "Feel the love",
        summery: "Emotional, umami, doughy and warm meal",
        desire: "Emotional",
        taste: "umami",
        texture: "doughy",
        temp: "warm",
        size: "meal",
        color: "#E4D2FF",
      },
      {
        name: "Looking for a snack",
        summery: "Snacking, sweet, crunchy and lukewarm appetizer",
        desire: "Snacking",
        taste: "sweet",
        texture: "crunchy",
        temp: "lukewarm",
        size: "appetizer",
        color: "#A06E29",
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
        color: "#FF6434",
      },
      {
        name: "Warm my heart",
        summery: "Comforting, salty, soft, warm, appetizer",
        desire: "Comforting",
        taste: "salty",
        texture: "soft",
        temp: "warm",
        size: "appetizer",
        color: "#E5C892",
      },
      {
        name: "Chasing thrills",
        summery: "Surprising, sour, juicy, freezing, bite",
        desire: "Surprising",
        taste: "sour",
        texture: "juicy",
        temp: "freezing",
        size: "bite",
        color: "#AC8AEE",
      },
      {
        name: "Looking for a snack",
        summery: "Snacking, salty, dry, hot, bite",
        desire: "Snacking",
        taste: "salty",
        texture: "dry",
        temp: "hot",
        size: "bite",
        color: "#A06E29",
      },
      {
        name: "Take a breath",
        summery: "Relaxing, bitter, liquid, hot, light meal",
        desire: "Relaxing",
        taste: "bitter",
        texture: "liquid",
        temp: "hot",
        size: "light meal",
        color: "#90D2DA",
      },
      {
        name: "Need a hug",
        summery: "Comforting, bitter, hard, cold, appetizer",
        desire: "Comforting",
        taste: "bitter",
        texture: "hard",
        temp: "cold",
        size: "appetizer",
        color: "#E5C892",
      },
      {
        name: "Feel the love",
        summery: "Emotional, sweet, doughy, warm, appetizer",
        desire: "Emotional",
        taste: "sweet",
        texture: "doughy",
        temp: "warm",
        size: "appetizer",
        color: "#E4D2FF",
      },
      {
        name: "Get my satisfaction",
        summery: "Junk food, sweet, soft, freezing, appetizer",
        desire: "Junk food",
        taste: "sweet",
        texture: "soft",
        temp: "freezing",
        size: "appetizer",
        color: "#FF6434",
      },
    ],
  },
};

function getVectorSvg(type, fill) {
  let svgPath = {};
  let vBox = "0 0 171 176";
  switch (type) {
    case "Sweet":
      svgPath = (
        <path
          d="M170.5 88C170.5 136.339 132.431 175.5 85.5 175.5C38.5693 175.5 0.5 136.339 0.5 88C0.5 39.6614 38.5693 0.5 85.5 0.5C132.431 0.5 170.5 39.6614 170.5 88Z"
          stroke="black"
        />
      );
      break;
    case "Salty":
      svgPath = (
        <rect
          width="122"
          height="121.975"
          transform="matrix(0.697963 -0.716133 0.697963 0.716133 0.210811 88.0977)"
          stroke="black"
        />
      );
      break;
    case "Bitter":
      svgPath = (
        <rect x="0.5" y="0.5" width="121" height="123" stroke="black" />
      );
      vBox = "0 0 122 124";
      break;
    case "Spicy":
      svgPath = <path d="M2 88L173 0.999993L173 175L2 88Z" stroke="black" />;
      break;
    case "Umami":
      svgPath = (
        <path
          d="M142.553 95.561C146.276 102.583 147.717 110.644 146.665 118.567C145.614 126.489 142.126 133.86 136.71 139.601C131.294 145.343 124.234 149.155 116.56 150.481C108.887 151.807 101.002 150.578 94.0562 146.972C92.8819 146.187 91.6634 145.473 90.4071 144.835C85.1936 142.125 79.4232 140.742 73.5811 140.8C67.739 140.859 61.9961 142.359 56.8351 145.172C56.0323 145.585 55.2295 146.072 54.4632 146.56C49.244 149.433 43.4159 150.94 37.4948 150.947C31.1705 150.948 24.9546 149.259 19.4566 146.048C13.9586 142.836 9.36736 138.21 6.13303 132.626C2.89869 127.041 1.13233 120.688 1.00715 114.19C0.881971 107.693 2.40227 101.273 5.41897 95.561C5.81509 95.0153 6.16892 94.4386 6.47722 93.836C9.35059 88.3379 10.8432 82.1897 10.8197 75.9489C10.8432 69.7081 9.35059 63.56 6.47722 58.0618C6.18529 57.4993 5.85687 56.8993 5.49195 56.3369C1.75576 49.2372 0.348454 41.0881 1.47917 33.1009C2.60988 25.1136 6.21826 17.7144 11.7681 12.0029C17.3179 6.29136 24.5129 2.57239 32.2838 1.39866C40.0547 0.224928 47.9867 1.65908 54.9011 5.48798C55.4485 5.86297 56.0323 6.20047 56.5797 6.50046C61.9234 9.47928 67.9067 11.039 73.986 11.0379C80.0591 11.062 86.042 9.52819 91.3924 6.57546C91.9397 6.27547 92.5236 5.93797 93.071 5.56298C99.9798 1.7236 107.91 0.277413 115.682 1.43936C123.455 2.6013 130.655 6.30935 136.213 12.0124C141.771 17.7155 145.39 25.1093 146.532 33.0948C147.675 41.0804 146.279 49.2315 142.553 56.3369C142.188 56.8993 141.86 57.4993 141.568 58.0618C138.668 63.5528 137.149 69.7014 137.149 75.9489C137.149 82.1965 138.668 88.345 141.568 93.836C141.853 94.4361 142.182 95.0128 142.553 95.561Z"
          stroke="black"
        />
      );
      vBox = "0 0 148 152";
      break;
    case "Sour":
      svgPath = (
        <path
          d="M86 2L109.759 63.6755L170 88L109.759 112.324L86 174L62.2412 112.324L2 88L62.2412 63.6755L86 2Z"
          stroke="black"
        />
      );
      vBox = "0 0 172 176";
      break;
  }
  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox={vBox}
      preserveAspectRatio="none"
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgPath}
    </svg>
  );
}

function getTexture(type) {
  switch (type) {
    case "Crunchy":
      return crunchyVector;
    case "Dense":
      return denseVector;
    case "Doughy":
      return doughyVector;
    case "Dry":
      return dryVector;
    case "Gummy":
      return gummyVector;
    case "Hard":
      return hardVector;
    case "Juicy":
      return juicyVector;
    case "Liquid":
      return liquidVector;
    case "Soft":
      return softVector;
    default:
      return softVector;
  }
}

function GetDots(index, isDay) {
  console.log(isDay);
  return (
    <svg
      width="86"
      height="8"
      viewBox="0 0 86 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="3.30769"
        cy="4.00008"
        r="3.30769"
        fill={isDay ? "black" : "white"}
        fillOpacity={index == 0 ? 1 : 0.3}
      />
      <circle
        cx="23.1538"
        cy="4.00008"
        r="3.30769"
        fill={isDay ? "black" : "white"}
        fillOpacity={index == 1 ? 1 : 0.3}
      />
      <circle
        cx="43"
        cy="4.00008"
        r="3.30769"
        fill={isDay ? "black" : "white"}
        fillOpacity={index == 2 ? 1 : 0.3}
      />
      <circle
        cx="62.8462"
        cy="4.00008"
        r="3.30769"
        fill={isDay ? "black" : "white"}
        fillOpacity={index == 3 ? 1 : 0.3}
      />
      <circle
        cx="82.6923"
        cy="4.00008"
        r="3.30769"
        fill={isDay ? "black" : "white"}
        fillOpacity={index == 4 ? 1 : 0.3}
      />
    </svg>
  );
}

const color = {
  Surprising: "#AC8AEE",
  Stimulating: "#FF6434",
  Emotional: "#E4D2FF",
  Refreshing: "#B4EFD5",
  Snacking: "#A06E29",
  Relaxing: "#90D2DA",
  Comforting: "#E5C892",
  "Junk food": "#FF6434",

  Sweet: "#FF6434",
  Sweet2: "#FEA6AB",
  Salty: "#B4EFD5",
  Salty2: "#90D2DA",
  Bitter: "#A06E29",
  Bitter2: "#E5C892",
  Spicy: "#FEA6AB",
  Spicy2: "#FF6434",
  Umami: "#E5C892",
  Umami2: "#A06E29",
  Sour: "#AC8AEE",
  Sour2: "#E4D2FF",

  Liquid: "#90D2DA",
  Liquid2: "#51ADBA",
  Juicy: "#B4EFD5",
  Juicy2: "#7FE0B2",
  Soft: "#FEA6AB",
  Soft2: "#FD6C73",
  Doughy: "#E5C892",
  Doughy2: "#CBA66D",
  Gummy: "#E4D2FF",
  Gummy2: "#CCADFF",
  Dense: "#AC8AEE",
  Dense2: "#906AE6",
  Dry: "#A06E29",
  Dry2: "#88551B",
  Crunchy: "#FF6434",
  Crunchy2: "#CA390C",
  Hard: "#A06E29",
  Hard2: "#88551B",

  Hot: "#FF6434",
  Warm: "#FEA6AB",
  Lukewarm: "#E5C892",
  Cold: "#B4EFD5",
  Freezing: "#90D2DA",

  Meal: "#FEA6AB",
  Lightmeal: "#E5C892",
  Appetizer: "#FF6434",
  Bite: "#AC8AEE",
};
