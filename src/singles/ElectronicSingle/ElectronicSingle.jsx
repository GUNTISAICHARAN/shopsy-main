import React from 'react'
import {useLocation} from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../contxt/CartContext';


export const ElectronicSingle = () => {

    const {addToCart,cartItems} = useCart();
    const location = useLocation();
    const selectedProduct = location.state && location.state.selectedProduct;
    
    
    if (!selectedProduct){
        return<p>no product selected </p>
    }

  return (
    <>
    <div className="flex bg-#B0D4E2">
     
      <div>
        <img src={selectedProduct.image} alt={selectedProduct.title}  className='w-full h-full' />
      </div>

        <div className='flex flex-col justify-start ml-6'>
        <div className='text-xl font-bold'>{selectedProduct.name}</div>
        <div className='text-lg'>Category:{selectedProduct.category}</div>
        <div className='text-md text-green-600'>Price:{selectedProduct.price}</div>
        <div className='text-md text-blue-500'>Rating:{selectedProduct.rating}</div>
        <button className="bg-blue-400 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onClick={()=>addToCart(selectedProduct)}
        >
          Add to Cart
        </button>
      </div>
      
    </div>
    <Footer></Footer>
    </>
  )
}
