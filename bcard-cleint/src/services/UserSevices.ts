import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode"

let api: string = `${process.env.REACT_APP_API}/users`;
export function getUsercrm() {
  return axios.get(`${api}/sendbox`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}


export function checkUser(userToCheck: User) {
  return axios.post(`${api}/login`, userToCheck);
}



export function adduser(newUser: User) {
  return axios.post(`${api}`, newUser);
}

export function getUser() {
  return axios.get(`${api}/profile`, {
  headers: {
    Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
  },
});

}

export function deleteuser(id: string) {
  const token = JSON.parse(sessionStorage.getItem("token") as string).token;
  
  return axios.delete(`${api}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}


export function getTokenDetails() {
  let token = JSON.parse(sessionStorage.getItem("token") as string).token;
  return jwt_decode(token);
}