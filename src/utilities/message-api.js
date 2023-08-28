import sendRequest from "./send-request";
const BASE_URL = "/api/messages";

export function getAllMessages() {
  return sendRequest(BASE_URL);
}

export function createMessage(addMessage) {
  return sendRequest(BASE_URL, "POST", addMessage);
}
