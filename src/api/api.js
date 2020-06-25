import axios from "axios";

const ENDPOINT = "http://localhost:3001";

// ======= Get usuarios Anonimos ======

async function getUsers() {
  try {
    return await axios.get(`${ENDPOINT}/users`);
  } catch (error) {
    console.log(error);
  }
}

async function getMessages() {
  try {
    return await axios.get(`${ENDPOINT}/messages`);
  } catch (error) {
    console.log(error);
  }
}

// ====== Login ======

export default {
  getUsers,
  getMessages,
};
