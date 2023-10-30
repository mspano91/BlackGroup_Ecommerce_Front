import {useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import Offer from "../../Components/Offer/Offer";
import repisa from "../../images/repisa1.jpg";
import repisas from "../../images/repisa2.jpg";
import muebles from "../../images/muebles.jpg";
import decoracion from "../../images/deco.jpg"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={style.contentWrapper}>
    <div className={style.home}>
      <div className={style.quienes}>
         <h1>¿Quienes</h1>
         <h1>Somos?</h1>
      </div>
      
        <span className={style.texto}>
            Black Group Desing es una empresa familiar,
            <br/>
           dedicada a la venta de muebles y diseño de espacios.
       </span> 
      <img src={repisa} className={style.repisa}/>
      <img src={repisas} className={style.repisas} />

     <div>
      <Offer/>  
     </div>


  <div className={style.contenedor}>
    <h1>Servicios</h1>

    <div className={style.servicios}>
        <div className={style.servicio}>
            <img src={muebles} alt="Muebles" onClick={() => navigate("/home/product")} className={style.muebles}/>
            <h1>MUEBLES</h1>
        </div>

        <div className={style.servicio}>
            <img src={decoracion} alt="Decoración" onClick={() => navigate("/home/decoracion")} className={style.decoracion}/>
            <h1>DECORACION</h1>
        </div>
    </div>
</div>  
   <Footer/>
    </div>
    </div>
  );
};

export default Home;
