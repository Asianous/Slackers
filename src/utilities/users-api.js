import sendRequest from "./send-request";
const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function searchUsers(query) {
  try{
    const res = await sendRequest(`/api/search?q=${query}`);
    // console.log(res)
    return res;
  }
  catch(error){
    console.log(error)
  }
  // throw new Error('Failed to search users.');
}

export async function updatePassword(passwordInfo) {
  return sendRequest(`${BASE_URL}/change-password`, 'PUT', passwordInfo);
}

export function UpdateUser(id, userData) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", userData);
}