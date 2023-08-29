import sendRequest from "./send-request";
import { getUser } from './users-service';

const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function updatePassword(passwordInfo) {
  return sendRequest(`${BASE_URL}/change-password`, 'PUT', passwordInfo);
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
}

// export async function addFriendToContacts(contacts, friend) {
//   const updatedContacts = [...contacts, friend];
//   return updatedContacts;
// }


// export async function addFriend(userId, contacts) {
//   try {
//     const newFriend = await sendRequest(`${BASE_URL}/add-friend/${userId}`, 'POST');
//     const updatedContacts = addFriendToContacts(contacts, newFriend);
//     return updatedContacts;
//   } catch (error) {
//     throw new Error('Failed to add friend.');
//   }
// }

// export async function addFriend(userId) {
//   try {
//     const response = await usersAPI.addFriend(userId);
//     const newFriend = response.data; 

//     const currentContacts = getUser().contacts || [];
//     const updatedContacts = addFriendToContacts(currentContacts, newFriend);
//     const updatedUser = { ...getUser(), contacts: updatedContacts };

//     localStorage.setItem('token', createToken({ user: updatedUser }));
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to add friend.');
//   }
// }

export async function addFriend(userId) {
  try {
    console.log('Sending request to add friend...');
    const response = await usersAPI.addFriend(userId);
    console.log('Received response:', response);
    const newFriend = response.data;

    const updatedUser = { ...getUser() };
    updatedUser.contacts.push(newFriend._id);

    localStorage.setItem('token', createToken({ user: updatedUser }));
    return response.data;
  } catch (error) {
    console.error('Error adding friend:', error);
    throw new Error('Failed to add friend.');
  }
}

export async function removeFriend(userId) {
  return sendRequest(`${BASE_URL}/remove-friend/${userId}`, 'DELETE');
}

