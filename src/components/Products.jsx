import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cart'
import Cart from './Cart'
import { Link } from 'react-router-dom'



export default function Products(){
    const [products, setProducts] = useState([]);
    const { cartItems, addToCart } = useContext(CartContext)
    const [showModal, setShowModal] = useState(false)


    const toggle = () => {
        setShowModal(!showModal)
      }


    async function getProducts() {
        const response = await fetch('https://fakestoreapi.com/products')  // fetch the products
        const data = await response.json() // convert the response to json
        setProducts(data) // set the products in the state to the products we fetched
      }
    

    useEffect(() => {
        getProducts()
    }, [])

    
    return(
        <div className='flex flex-col justify-center bg-gray-100'>
            {/* <div className='bg-blue-00 gap-6 flex justify-start items-center px-20 py-5'>
                <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
                <Link className='text-2xl uppercase font-bold mt-10 mb-10 m-b'>log in</Link>
                {!showModal && <button className='ml-auto px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                onClick={toggle}>
                Cart ({cartItems.length})</button>}
            </div> */}
            <div className='flex gap-3 mb-4 mr-10 justify-end'>
                <button className='px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-700'>Sort↑↓</button>
                
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
                {
                products.map(product => (
                    <div key={product.id} className='bg-white shadow-md rounded-lg px-10 py-10 flex flex-col justify-between gap-3 '>
                    <img src={product.image} alt={product.title} className='rounded-md w-auto h-40 self-center ' />
                    <div className='mt-4'>
                        <h1 className='text-lg uppercase font-bold'>{product.title}</h1>
                        <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
                        <p className='mt-2 text-gray-600 font-semibold'>${product.price.toFixed(2)}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                        <Link to={`/details/${product.id}`} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>more details</Link>
                        <button onClick={() => addToCart(product)} className='px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none'>Add to cart</button>
                        
                    </div>
                    </div>
                ))
                }
            </div>
            
            <Cart showModal={showModal} toggle={toggle} />
            
        </div>
    )
}