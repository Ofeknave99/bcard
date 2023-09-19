import axios from "axios";
import Card from "../interfaces/Card";


let api: string = `${process.env.REACT_APP_API}/favs`;


export function getfav(userId: string) {
  return axios.get(`${api}/${userId}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// add or remove user's favorits 
export function addRemoveFavorites(cardToAdd: string) {
  const cardId = { _id: cardToAdd }
  return axios.post(api, cardId, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

