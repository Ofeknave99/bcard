import Card from "./Card";

export default interface fav{
     _id?:string;
    userId:string;
    cards: Card[];
    active:boolean;
}