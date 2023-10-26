import {useDispatch, useSelector} from "react-redux"

import { orderbyprice } from '../../Redux/actions';
import { useEffect } from "react";

const Filters = () => {
   
    const dispatch = useDispatch();
    const product= useSelector((state)=> state.products)
   console.log(product);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
   dispatch ( orderbyprice( product,orderDirection)); 
  };

useEffect
    return (
        <div>
       <label>Ordenar por precio:</label>
       <select onChange={handleOrderChange}>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>

      <select>
        <option>MUEBLES</option>
      </select>

        </div>
    )

}

export default Filters