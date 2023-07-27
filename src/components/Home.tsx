import React, { FunctionComponent, useEffect, useState } from 'react';
import Card from '../interfaces/Card';
import { getCard, deleteCard } from '../services/CardService';
import { Link } from 'react-router-dom';
import { addToFav, removeFromFav, checkIfInFav, getFav } from '../services/favService';
import { successMsg } from '../services/feedbackServicw';

interface HomeProps {
  userInfo: any;
  cards: Card[];
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, cards }) => {
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState<number[]>([]);

  useEffect(() => {
    
   getFav(userInfo.userId).then((res)=>{
    let userFavorites = res.data.find((fav:any) => fav.userId === userInfo.userId);
    let defaultCardIds: number[] = userFavorites?.cards.map((card:any) => card.id) || []; 
    setFavoriteCards(defaultCardIds)   }).catch((err)=>console.log(err))
   getCard().then((res) => setCardsList(res.data))
   .catch((err) => console.log(err));  
  }, []);

  

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

  const handleAddToFav = (card: Card) => {
    setIsLoading(true);
    if (favoriteCards.includes(card.id as number)) {
      removeFromFav(userInfo.userId, card.id as number)
        .then((res) => {
          setFavoriteCards(favoriteCards.filter((id) => id !== card.id));
          successMsg('Card removed from favorites!');
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      addToFav(userInfo.userId, card)
        .then((res) => {
          setFavoriteCards([...favoriteCards, card.id as number]);
          successMsg('Card added to favorites!');
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleDeleteFromFav = (cardId: number) => {
    if (window.confirm('Are you sure you want to remove this card from favorites?')) {
      removeFromFav(userInfo.userId, cardId)
        .then((res) => {
          setFavoriteCards(favoriteCards.filter((id) => id !== cardId));
          successMsg('Card removed from favorites!');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    <h1>BCARD</h1>
    <h3>The virtual card for your business</h3>
      {(userInfo.role === 'business' || userInfo.role === 'admin') && (
        <Link to="/AddCard" className="btn btn-success my-2 ">
          <i className="fa-solid fa-address-card"> Add Card</i>
        </Link>
      )}
       
      {cardsList.length ? (
        <div className="container mb-2 ">
          <div className="row">
            {cardsList.map((card: Card) => (
              
              <div
                key={card.id}
                className="card col-md-4 mx-2 mb-3"
                style={{ width: '18rem' }}
              >
                  <Link to={`/CardShow/${card.id}`}>
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.title}
                  style={{ width: '100%', height: '16.5rem' }}
                /> 
                </Link>
           
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
                       <hr />
                  {userInfo.role === 'admin' || (userInfo.role === 'business' && userInfo.email === card.email) ? (
                    <>
                      <p className="card-text">Card Number: {card.zip}</p>
                      <Link to={`/update/Card/${card.id}`} className="btn btn-warning mx-1">
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


   {(userInfo.role === 'regular' || userInfo.role === 'admin' || userInfo.role === 'business') && !favoriteCards.includes(card.id as number) && !isLoading && (
    
  <button
    className="btn btn-primary mx-1"
    onClick={() => handleAddToFav(card)}
    disabled={isLoading}
  >
    <i className="far fa-heart"></i>
    <span className="sr-only">Add to Favorites</span>
  </button>
)}

{favoriteCards.includes(card.id as number) && !isLoading && (
  <button
    className="btn btn-danger mx-1"
    onClick={() => handleDeleteFromFav(card.id as number)}
  >
    <i className="far fa-heart"></i>
    <span className="sr-only">Remove from Favorites</span>
  </button>
)}

  <button className="btn btn-success">
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

export default Home;
