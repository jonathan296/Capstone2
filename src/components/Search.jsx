import { useEffect, useState } from "react"



export default function Search(){
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState([]);
    
    const APIURL = `https://fakestoreapi.com/products`
    
    
    useEffect(() => {
       async function getProducts() {
        const response = await fetch(`${APIURL}`)  // fetch the products
        const data = await response.json() // convert the response to json
        setProducts(data) // set the products in the state to the products we fetched
        console.log("rendering")
      }
      getProducts()

    }, [APIURL])

    function searchBar(product){
        if(query === ''){
            return 
        }else if(product.title.toLowerCase().includes(query.toLowerCase())){
            return product
        }
    }

    return(
        <div>
            <div className='flex justify-center flex-row items-center mb-6'>
                Search:<input type='text' placeholder='Hello world' onChange={event => setQuery(event.target.value)} className='w-80 mx-2 p-2 rounded-lg shadow-sm'></input>            
            </div>
            <div>
                {products.filter(searchBar).map(product=>(
                <div key={product.id} className="m-auto  w-80  bg-white text-center">
                    <h1 className="border-2 border-gray-300">{product.title}</h1>
                </div>
                ))}
            </div> 
        </div>
        
    )
    
}