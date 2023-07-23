import Card from "./Card";

export default interface fav{
     id?:number;
    userId:number;
    cards: Card[];
    active:boolean;
}