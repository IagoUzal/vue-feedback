import axios from "axios";
import jwt from "jwt-decode";

const ENDPOINT = "http://localhost:3001";
const AUTH_TOKEN_KEY = "authtoken";

// ====== Función de login ======

export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/users/login`, // url de la autenticación
        method: "POST", // Metodo de la autenticación
        data: {
          email: email,
          password: password,
        }, // Datos de la autenticación
      });

      setAuthToken(res.data.data.token, res.data.data.tokenPayload);

      resolve();
    } catch (err) {
      // Si hay error en el back lo guardo en localStorage
      if (err.response) {
        localStorage.setItem("errorBack", err.response.data.message);
        console.log(err.response.data.message);
      }

      console.log("Error en Login", err);
    }
  });
}

// ====== Logout ======

export function clearLogin() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("Usuario");
  localStorage.removeItem("userID");
  localStorage.removeItem("avatar");
  localStorage.clear();
  clearAdmin();
}

// ====== Token ======

// Guardar Token
export function setAuthToken(token, payload) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem("userID", payload.id);
  localStorage.setItem("avatar", payload.avatar);
}

// Coger Token
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Fecha de caducidad del token
export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //si no hay, no sigue
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

// Comprobando la fecha del token si es validada
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

// Comprobando si el user esta logeado
export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

// ====== Rol Usuario ======

// Guardar si es Admin en localsorage
export function setIsAdmin(isAdmin) {
  localStorage.setItem(ROLE, isAdmin);
}

// Borrar rol de user en localstorage
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// Recuperar rol del localstorage
export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

// Comprobar rol
export function checkAdmin() {
  let role = false;
  let isAdmin = getIsAdmin();
  if (isAdmin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}
