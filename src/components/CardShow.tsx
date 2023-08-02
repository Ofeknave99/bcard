import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../interfaces/Card';
import { getCardById } from '../services/CardService';

const CardShow: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    getCardById(Number(id))
      .then((res) => setCard(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!card) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
      className="container col-md-3 mt-5 vh-100% vw-100"
      style={{
        backgroundColor: '#2c3e50',
        boxShadow: '0px 6px 12px rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>{card.title}</h1>
      <img
        src={card.image}
        className="card-img-top"
        alt={card.title}
        style={{ width: '50%', height: '16.5rem', borderRadius: 20 }}
      />
      <br />
      <p style={{ color: 'white', fontSize: '1.3rem', fontFamily: 'Caveat' }}>
        {card.sutitle}
      </p>
      <p style={{ color: 'white', fontFamily: 'Caveat', fontSize: '1.3rem' }}>
        {card.description}
      </p>
      <p style={{ color: 'green' }}>Phone: {card.phone}</p>
      <p>
        Address: {card.country} {card.city} {card.street} {card.Hosenumber}
      </p>
      <a href={card.web} style={{ fontSize: '2.5rem', marginRight: 10, color: 'white' }}>
        <i className="fa-solid fa-globe"></i>
      </a>
      <a href={card.state} style={{ fontSize: '2.5rem', color: 'white' }}>
        <i className="fa-solid fa-map-location-dot fa-bounce"></i>
      </a>
    </div>
    </>
  );
};

export default CardShow;
