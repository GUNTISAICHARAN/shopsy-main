import React, { useEffect, useState } from 'react';
import { useCart } from '../contxt/CartContext';

const UserCart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [persistedCartItems, setPersistedCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setPersistedCartItems(storedCartItems);
  }, []);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total cost
  const totalCost = cartItems.reduce((total, product) => total + product.price, 0);

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-2/3 p-4">
        <h2 className="w-full">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="w-full">Your cart is empty</p>
        ) : (
          <div className="w-full">
            {cartItems.map((product) => (
              <div key={product.id} className="flex my-4 p-4 border border-gray-300">
                <div className="w-1/4">
                  <img src={product.image} alt="" className="w-full" />
                </div>
                <div className="w-3/4 pl-4">
                  <div className="mb-2 font-bold">{product.name}</div>
                  <div className="mb-2">{product.category}</div>
                  <div className="mb-2">${product.price.toFixed(2)}</div>
                  <div className="flex items-center">
                    <button
                      className="text-white bg-green-500 px-2 py-1 rounded mr-2"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                    <span className="mr-2">{product.quantity}</span>
                    <button
                      className="text-white bg-red-500 px-2 py-1 rounded"
                      onClick={() => removeFromCart(product, true)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="w-full lg:w-1/3 p-4">
          <h2 className="w-full">Order Summary</h2>
          <div className="w-full p-4 border border-gray-300">
            <div className="mb-2">
              <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
            </div>
            <button className="text-white bg-green-500 px-4 py-2 rounded">Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
