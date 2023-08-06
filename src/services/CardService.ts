import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;


export function getCard() {
  return axios.get(api);
}


export function getCardById(id: number) {
  return axios.get(`${api}/${id}`);
}
export function getCardByOwner(owner: string) {
  return axios.get(`${api}?owner=${owner}`);
}


export function addCard(newCard: Card) {
  return axios.post(api, newCard);
}

export function updateCard(updateCard: Card, id: number) {
  return axios.put(`${api}/${id}`, updateCard);
}


export function deleteCard(id: number) {
  return axios.delete(`${api}/${id}`);
}