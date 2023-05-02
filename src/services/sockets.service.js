import io from "socket.io-client";

const url =
  process.env.NODE_ENV === "production"
    ? "https://player-bid-app-z9o0.onrender.com/"
    : "http://localhost:8085/";
let socket;

const connect = () => {
  socket = io(url);
};

const join = (roomName, username) => {
  if (!socket) {
    connect();
  }
  socket.emit("joinAuction", {
    username,
    roomName,
  });
};

const create = (roomName, username) => {
  if (!socket) {
    connect();
  }
  socket.emit("createAuction", {
    username,
    roomName,
  });
};

socket.on("joinAuction", () => {});
export { create, join };
