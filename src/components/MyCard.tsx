import React, { FunctionComponent, useState, useEffect } from 'react';
import Card from '../interfaces/Card';
import { getCardByEmail, deleteCard } from '../services/CardService';
import { Link } from 'react-router-dom';
import { successMsg } from '../services/feedbackServicw';

interface MyCardProps {
  userInfo: any;
  cards: Card[];
}

const MyCard: FunctionComponent<MyCardProps> = ({ userInfo, cards }) => {
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCardByEmail(userInfo.email) 
      .then((res) => setCardsList(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email]); 

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure?')) {
      deleteCard(id)
        .then((res) => {
          setCardsList(cardsList.filter((card) => card.id !== id));
          successMsg('Card deleted successfully!');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
     <div className="container col-md-3 mt-5  vw-100 ">
    <h1>your cards</h1>
      {cardsList.length ? (
        <div className="container mb-2 ">
          <div className="row">
            {cardsList.map((card: Card) => (
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
                  {userInfo.role === 'business' || userInfo.role === 'admin' ? (
                    <>
                      <p className="card-text">Card Number: {card.zip}</p>
                      <Link
                        to={`/update/Card/${card.id}`}
                        className="btn btn-warning mx-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link
                        to=""
                        className="btn btn-danger"
                        onClick={() => handleDelete(card.id as number)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cards</p>
      )}
      </div>
    </>
  );
};

export default MyCard;

