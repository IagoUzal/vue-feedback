import axios from "axios";

const URL_BASE = "http://localhost:3001";
const GET_MESSAGES = "/messages";
const GET_USERS = "/users";

async function getUsers() {
  try {
    return await axios.get(`${URL_BASE}${GET_USERS}`);
  } catch (error) {
    console.log(error);
  }
}

async function getMessages() {
  try {
    return await axios.get(`${URL_BASE}${GET_MESSAGES}`);
  } catch (error) {
    console.log(error);
  }
}

export default {
  getUsers,
  getMessages,
};
