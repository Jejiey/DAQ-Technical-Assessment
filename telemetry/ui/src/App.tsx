import React, { useState, useEffect } from "react";
import LiveValue from "./live_value";
import RedbackLogo from "./redback_logo.jpg";
import "./App.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import LineChart from "./LineGraph";
const WS_URL = "ws://localhost:8080";
interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

function App() {
  const [temperature, setTemperature] = useState<number>(0);
  const {
    lastJsonMessage,
    readyState,
  }: { lastJsonMessage: VehicleData | null; readyState: ReadyState } =
    useWebSocket(WS_URL, {
      share: false,
      shouldReconnect: () => true,
    });

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        console.log("Connected to streaming service");
        break;
      case ReadyState.CLOSED:
        console.log("Disconnected from streaming service");
        break;
      default:
        break;
    }
  }, [readyState]);

  useEffect(() => {
    // console.log("Received: ", lastJsonMessage);
    if (lastJsonMessage === null) {
      return;
    }
    setTemperature(lastJsonMessage["battery_temperature"]);
  }, [lastJsonMessage]);

  useEffect(() => {
    document.title = "Redback";
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img
          src={RedbackLogo}
          className="redback-logo"
          alt="Redback Racing Logo"
        />
      </div>
      <div className="leftSide">
        <p className="value-title">Live Battery Temperature</p>
        <p className="temp-Container">
          <LiveValue temp={temperature} />
        </p>
      </div>

      <div className="rightSide">
        <div className="lineContainer">
          <LineChart temp={temperature}></LineChart>
        </div>
      </div>
    </div>
  );
}

export default App;
