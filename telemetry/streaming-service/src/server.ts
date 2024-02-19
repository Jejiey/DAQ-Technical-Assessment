import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

// 3) on brainstorming
process.on('uncaughtException', function (err) {
  console.log(err);
}); 

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  let OutOfBound: {battery_temperature:number, timestamp: number}[] = [];
  let OOBtime = 0;

  socket.on("data", (msg) => {
   // console.log(`Received: ${msg.toString()}`);

    const jsonData: VehicleData = JSON.parse(msg.toString());
    
    if (jsonData.battery_temperature > 80 || jsonData.battery_temperature < 20){
      OutOfBound.push(jsonData);
       OOBtime = OutOfBound[0].timestamp;
    }
    if (jsonData.timestamp - OOBtime > 5000 ){
      OutOfBound.shift();
    }
    if (OutOfBound.length>3){
      console.error("At the timestamp of: ", jsonData.timestamp," an out of range value appeared more than 3 times in 5 seconds")
     // console.log(OutOfBound, jsonData.timestamp - OutOfBound[0].timestamp)
    }
     

    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});



websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
