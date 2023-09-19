import React, { FunctionComponent, useEffect, useState } from "react";
import { addRemoveFavorites, getfav,  } from "../services/favService";
import Card from "../interfaces/Card";
import { successMsg } from "../services/feedbackServicw";
import { getCard } from "../services/CardService";

interface FavProps {
  userInfo: any;
}

const Fav: FunctionComponent<FavProps> = ({ userInfo }) => {
  const [favs, setFavs] = useState<Card[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<string[]>([]);

  const handleaddToFav = (card: Card) => {
    if (favoriteCards.includes(card._id as string)) {
      addRemoveFavorites(card._id as string)
        .then((res) => {
          setFavoriteCards(favoriteCards.filter((id) => id !== card._id));
          successMsg(`${card.title} business card was removed from favorites!`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getfav(card._id as string)
        .then((res) => {
          setFavoriteCards([...favoriteCards, card._id as string]);
          successMsg(`${card.title} business card was added to favorites!`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getfav(userInfo.userId)
      .then((res) => {
        const defaultCardIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
        setFavoriteCards(defaultCardIds);
      })
      .catch((err) => console.log(err));
  }, [userInfo.userId]);

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getCard()
      .then((res) => {
        setCards(res.data.filter((card: Card) => favoriteCards.includes(card._id as string)));
      })
      .catch((err) => console.log(err));
  }, [favoriteCards]);

  return (
    <>
      <h1>Your Favorites</h1>
      {cards.length ? (
        <div className="container-fluid mb-2">
          <div className="row d-flex justify-content-center">
            {cards.map((card: Card) => (
              <div
                key={card._id}
                className="card col-md-4 mx-2 mb-3"
                style={{
                  width: "18rem",
                  boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.5)",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.title}
                  style={{ width: "100%", height: "16.5rem" }}
                />
                <hr />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <hr />
                  <p className="card-text "> {card.sutitle}</p>
                  <hr />
                  <p className="card-text text-success">Phone: {card.phone}</p>
                  <hr />
                  <p className="card-text">
                    Address: {card.country} {card.city} {card.street} {card.Hosenumber}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleaddToFav(card)}
                  >
                    {favoriteCards.includes(card._id as string)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>
                  <button className="btn btn-success mx-2 ">
                    <a href={`tel:${card.phone}`} style={{ color: "white", textDecoration: "none" }}>
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cards</p>
      )}
    </>
  );
};

export default Fav;
