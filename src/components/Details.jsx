import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cart'
import Cart from './Cart'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function Details(){
    const [products, setProducts] = useState([]);
    const { cartItems, addToCart } = useContext(CartContext)
    const [showModal, setShowModal] = useState(false)
    const {id} = useParams();
    const dookie = Object.values({id});

    const toggle = () => {
        setShowModal(!showModal)
      }


    async function getProducts() {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)  // fetch the products
        const data = await response.json() // convert the response to json
        setProducts(data) // set the products in the state to the products we fetched
      }
    

    useEffect(() => {
        getProducts()
    },[])

    
    return(
        
        <div >
            <div className='bg-white shadow-md rounded-lg px-10 py-10 flex flex-col justify-between gap-3 '>
                    <img src={products.image} alt={products.title} className='rounded-md w-auto h-40 self-center ' />
                    <h1>{products.title}</h1>
                    <h1 className='text-lg uppercase font-bold'>{products.title}</h1>
                      
            </div>
                         
        </div>
    )
}