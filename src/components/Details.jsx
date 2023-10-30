import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";

import { useParams } from "react-router-dom";

export default function Details() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();


  async function getProducts() {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`); // fetch the products
    const data = await response.json(); // convert the response to json
    setProducts(data); // set the products in the state to the products we fetched
    
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg px-10 py-10 flex flex-row m-10 justify-center gap-72 ">
        <div>
          <img
            src={products.image}
            alt={products.title}
            className="rounded-md object-contain h-80 w-auto self-center my-2"
          />
        </div>
        <div className="text-left w-1/3 flex flex-col justify-center">
          
          <h1 className="text-lg uppercase font-bold">{products.title}</h1>
          <p className="text-lg font-light mb-4"> {products.category}</p>
          <p className="mb-4">{products.description}</p>
          <p className="mb-3">${products?.price?.toFixed(2)}</p>  {/*optional chaininig operator to prevent undifined crash */}   
          <button
            onClick={() => addToCart(products)}
            className="px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
