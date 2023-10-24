import { useEffect, useState } from 'react'
import Products from './components/Products'
import './index.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Products/>
      </div>
      
    </>
  )
}

export default App
