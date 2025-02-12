// import Rating from "../../Components/Rating/Rating";
import Styles from "../Product/card.module.css";
import { useNavigate } from "react-router-dom";
import Iconfavorites from "./favorites/Iconfavorites";
// import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function Card({ id, name, image, rating, types, description, price, stock, color, material }) {
  const PrecioEnCuota = (price / 12).toFixed(2);
  const navigate = useNavigate();

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      <div className={Styles.cardContainer}>
        <Iconfavorites 
          id={id}
          name={name}
          type={types}
          material={material}
          description={description}
          price={price}
          stock={stock}
          color={color}
          image={image}
        />
        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />
        <div className={Styles.containerStars}>
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <AiFillStar
              key={starIndex}
              className={`${Styles.star} ${
                starIndex <= rating ? Styles.starHovered : ""
              }`}
              onClick={() => navigate(`/detail/${id}`)}
            />
          ))}
        </div>
        <h6 className={Styles.titulo}>{name}</h6>
        <div className={Styles.details}>
          <h6>Precio</h6>
          <h4>${formatthousand(price)}.-</h4>
        </div>
        <div className={Styles.cuota}>
          <h4>Paga en 12x ${PrecioEnCuota} </h4>
        </div>
      </div>
    </>
  );
}
