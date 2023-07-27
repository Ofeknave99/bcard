import axios from "axios";
import User from "../interfaces/User";

let api: string = `${process.env.REACT_APP_API}/users`;
export function getuser() {
  return axios.get(api);
}

    export function checkUser(userToCheck: User) {
  return axios.get(
    `${api}?email=${userToCheck.email}&password=${userToCheck.password}`
  );
}


export function adduser(newUser: User) {
  return axios.post(api, newUser);
}


export function getUserByEmail(email: string) {
  return axios.get(`${api}?email=${email}`);
}
export function deleteuser(id: number) {
  return axios.delete(`${api}/${id}`);
}