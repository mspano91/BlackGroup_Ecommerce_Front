import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import SideBar from "./Components/SideBar/SideBar";
import Product from "./views/Product/Product";
import Decoracion from "./views/Decoration/Decoration";
import FormDecoracion from "./views/FormDecoracion/FormDecoracion";
import LoginForm from "./views/LoginForm/LoginForm";
import FormRegistro from "./views/FormRegistro/FormRegistro";
import NavBar from "./Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "./Redux/actions";
import Detail from "./views/Detail/Detail";



function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const location = useLocation();

  useEffect(() => {
    dispatch(getProductsAction())
  }, []);

  return (
    <>
    <NavBar/>
    <div className={styles.sideBar}>
      <SideBar isOpen={isOpenSideBar} onClick={() => setIsOpenSideBar(!isOpenSideBar)}/>
    </div>

    <button className={styles.toggleSidebarBtn} onClick={() => setIsOpenSideBar(!isOpenSideBar)}> SideBar
      {isOpenSideBar ? "Close" : "Open"}
    </button>

    <div className={styles.contentContainer}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home/decoracion' element={<Decoracion/>} />
        <Route path="/form/decoracion" element={<FormDecoracion/>}/>
        <Route path="/home/product" element={<Product productos={productos}/>} />
        <Route path="/form/login" element={<LoginForm/>}/>
        <Route path="/form/register" element={<FormRegistro/>} />
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>  
      </div>
    </>
  );
}

export default App;
