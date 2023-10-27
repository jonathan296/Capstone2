import { useEffect, useState, useContext } from 'react'
import Products from './components/Products'
import { CartContext } from './context/cart'
import './index.css'
import { Routes, Route, Link } from 'react-router-dom'
import Details from './components/Details'
import Cart from './components/Cart'
import icon from './assets/react.svg'
import Home from './components/Home'



function App() {
  const { cartItems, addToCart } = useContext(CartContext)
  const [showModal, setShowModal] = useState(false)

  
    const toggle = () => {
        setShowModal(!showModal)
        
      }

  return (
    <div className='bg-gray-100'>
      
        <div className='bg-gray-500 gap-6 flex justify-start items-center px-20 py-1 mb-9 mx-10 text-neutral-900 shadow-md rounded-b-lg'>
          <img src={icon}></img>
          
          <Link to='/'><h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Home</h1></Link>
          <Link to='/products'><h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Products</h1></Link>
          <Link className='text-2xl uppercase font-bold mt-10 mb-10 m-b'>log in</Link>
          {!showModal && <button className='ml-auto px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
          onClick={toggle}>
          Cart ({cartItems.length})</button>}
        </div>
        <div>
          <Routes>
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>

        <Cart showModal={showModal} toggle={toggle}/>
    </div>
  )
}

export default App
