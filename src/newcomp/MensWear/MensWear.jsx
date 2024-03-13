import React from 'react'
import { useState,useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';


const MensWear = () => {
    const [menswearwData,setMenswearData] = useState([]);
    const navigate = useNavigate();

  function pageDetails(selectedProduct){
    navigate(`/single-mens`,{state:{selectedProduct}})
  }

    useEffect(()=>{
        const fetchData= async() =>{
            try{
                const response = await fetch('/menswear.json');
                const data =await response.json();
                console.log(data)
                setMenswearData(data.menswear);
            }catch(error){
                console.log('Error fetching data:',error);
            }
        };
        fetchData();
    },[]);

  return ( 
    <>
    <div className="container mx-auto p-0 ">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menswearwData.map((product) => (
  
          <li key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md" onClick={() =>pageDetails(product)} >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-xl font-bold mb-2">{product.name}</p>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-green-600 font-bold mb-2">Price: ${product.price}</p>
              <p className="text-blue-500 mb-2">Rating: {product.rating}</p>
            </div>
          </li>
          
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  )
}

export default MensWear
