import React, { FunctionComponent, useEffect, useState } from "react";
import { getFav, removeFromFav } from "../services/favService";
import Card from "../interfaces/Card";

interface FavProps {
  userInfo: any;
}

const Fav: FunctionComponent<FavProps> = ({ userInfo }) => {
  const [favs, setFavs] = useState<Card[]>([]);

  useEffect(() => {
    const fetchFavCards = async () => {
      try {
        const res = await getFav(userInfo.userId);
        setFavs(res.data[0]?.cards || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavCards();
  }, [userInfo]);

  const handleDeleteFromFav = async (cardId: number) => {
    if (window.confirm("Are you sure you want to remove this card from favorites?")) {
      try {
        await removeFromFav(userInfo.userId, cardId);
        setFavs(favs.filter((card) => card.id !== cardId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
    <h1>your favorite</h1>
      {favs.length ? (
        <div className="container mb-2">
          <div className="row">
            {favs.map((card: Card) => (
                <div
                key={card.id}
                className="card col-md-4 mx-2 mb-3"
                style={{ width: '18rem' }}
              >
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.title}
                  style={{ width: '100%', height: '16.5rem' }}
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
                    Address: {card.country} {card.city} {card.street}  {card.Hosenumber}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteFromFav(card.id as number)}
                  >
                    Remove from Favorites
                  </button>
                  <button className="btn btn-success ">
  <a href={`tel:${card.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
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
