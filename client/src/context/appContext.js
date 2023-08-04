import React from "react";
import {io} from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_SERVER_URL}`;
export const socket = io(SOCKET_URL);

export const AppContext = React.createContext();