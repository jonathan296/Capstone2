import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cart'
import { Link } from 'react-router-dom'


export default function Products(){
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext)
    const [sort, setSort] = useState("?sort=asc")
    const [category, setCategory] = useState("")
    const [query, setQuery] = useState('')
    const APIURL = `https://fakestoreapi.com/products${category}${sort}`
    
    
    useEffect(() => {
       async function getProducts() {
        const response = await fetch(`${APIURL}`)  // fetch the products
        const data = await response.json() // convert the response to json
        setProducts(data) // set the products in the state to the products we fetched
        console.log("rendering")
      }
      getProducts()

    }, [APIURL])


    function sortButton(){ //sort button
        
        switch(sort){
            case "?sort=asc":
                setSort("?sort=desc");
                break;
            case "?sort=desc":
                setSort("?sort=asc")
                break;
        }
        
    }  

    console.log(APIURL)


    return(
        <div className='flex flex-col justify-center it bg-gray-100'>
            <div className='flex justify-center flex-row items-center mb-6'>
                Search:<input type='text' className='w-80 mx-2 p-2 rounded-lg shadow-sm'></input>
            </div>
            
            <div className='flex gap-3 mb-4 mr-10 ml-10 justify-end'>
                Category:<button onClick={()=>{setCategory("/category/jewelery")}} className='px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-300'>Jewelery</button>
                <button onClick={()=>{setCategory("/category/electronics")}} className='px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-300'>Electronics</button>
                <button onClick={()=>{setCategory("/category/men's%20clothing")}} className='px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-300'>Men&apos;s Clothing</button>
                <button onClick={()=>{setCategory("/category/women's%20clothing")}} className='px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-300'>women&apos;s clothing</button>
                <button onClick={()=>{setCategory("")}} className='px-4 py-2 bg-red-400 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-300'>clear</button>
                <button onClick={sortButton} className='px-4 py-2 ml-auto bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-green-700'>Sort↑↓</button>
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
            
        </div>
    )
}