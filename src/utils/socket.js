import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnetion = ()=>{
  return io(BASE_URL);
}