// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api';

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  // Delegate the AJAX request to the users-api.js
  // module.
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
  // We can't forget how to use .then with promises
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}

export function updatePassword({oldPassword, newPassword}){
  return usersAPI.updatePassword({
    oldPassword, newPassword
})}

export async function addFriend(userId) {
  try {
    const response = await usersAPI.addFriend(userId);
    const newFriend = response.data; 

    const currentContacts = getUser().contacts || [];
    const updatedContacts = addFriendToContacts(currentContacts, newFriend);
    const updatedUser = { ...getUser(), contacts: updatedContacts };

    localStorage.setItem('token', createToken({ user: updatedUser }));
    return response.data;
  } catch (error) {
    throw new Error('Failed to add friend.');
  }
}