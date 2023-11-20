import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { DiscountedProduct, PercentageOffStrategy, BuyOneGetOneFreeStrategy } from './Product';

// Create a context for the shopping cart
const CartContext = createContext();

// A custom hook to use the cart context
const useCart = () => useContext(CartContext);

const Notification = ({ message }) => (
  <div className="notification">
    {message}
  </div>
);

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <li>
      <div className="cart-item">
        <div className="cart-item-image">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="cart-item-details">
          <p>{item.name}</p>
        </div>
        <div className="cart-item-price">
          ₹{item.price}
        </div>
        <div className="cart-item-quantity">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
        <div className="cart-item-total">
          ₹{item.price * item.quantity}
        </div>
        <div className="cart-item-remove">
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
}



function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null); 

  useEffect(() => {
    // Fetch products from your API or backend
    // For now, I'll just use a sample array

    const sampleProducts = [
      new DiscountedProduct('Mobile Phone', 15000, true, new PercentageOffStrategy(), 'Motorola edge.jpeg'),
      new DiscountedProduct('Laptop', 50000, true, new BuyOneGetOneFreeStrategy(), 'laptop.jpg'),
      new DiscountedProduct('Headphones', 2000, true, new PercentageOffStrategy(), 'headphones.jpg'),
      new DiscountedProduct('Earphones', 1000, true, new BuyOneGetOneFreeStrategy(), 'earphones.jpg'),
      new DiscountedProduct('Tablet', 30000, true, new PercentageOffStrategy(), 'tablet.jpg'),
      new DiscountedProduct('Smartwatch', 5000, true, new BuyOneGetOneFreeStrategy(), 'smartwatch.jpg'),
      new DiscountedProduct('Camera', 35000, true, new PercentageOffStrategy(), 'camera.jpg'),
      new DiscountedProduct('Gaming Console', 25000, true, new BuyOneGetOneFreeStrategy(), 'gaming-console.jpg'),
      new DiscountedProduct('Bluetooth Speaker', 3000, true, new PercentageOffStrategy(), 'bluetooth-speaker.jpg'),
      new DiscountedProduct('Fitness Tracker', 4000, true, new BuyOneGetOneFreeStrategy(), 'fitness-tracker.jpg'),
      new DiscountedProduct('Wireless Mouse', 1500, true, new PercentageOffStrategy(), 'wireless-mouse.jpg'),
      new DiscountedProduct('VR Headset', 10000, true, new BuyOneGetOneFreeStrategy(), 'vr-headset.jpg'),
      new DiscountedProduct('External Hard Drive', 8000, true, new PercentageOffStrategy(), 'external-hard-drive.jpeg'),
      new DiscountedProduct('Printer', 12000, true, new BuyOneGetOneFreeStrategy(), 'printer.jpg'),
      new DiscountedProduct('Smart Home Hub', 6000, true, new PercentageOffStrategy(), 'smart-home-hub.jpeg'),
      new DiscountedProduct('Wireless Keyboard', 2000, true, new BuyOneGetOneFreeStrategy(), 'wireless-keyboard.jpg'),
      // Add more products as needed
    ];

    setProducts(sampleProducts);
  }, []);

  const handleAddToCart = (product) => {
    setNotification(`${product.name} has been added to the cart`);
    // Clear the notification after a delay
    setTimeout(() => {
      setNotification(null);
    }, 1000); // 3000 milliseconds (3 seconds)

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotalBill = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>EI commerce </h1>
      </header>
      <main>
        {/* Provide the cart context value */}
        <CartContext.Provider value={cart}>
        {notification && <Notification message={notification} />}
          <h2>Products</h2>
          <div className="product-container">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
                <p>₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </CartContext.Provider>

        <h2>Cart</h2>
        <ul>
          <li className="cart-header">
            <div className="cart-item-header">Item</div>
            <div className="cart-item-header">Price</div>
            <div className="cart-item-header">Quantity</div>
            <div className="cart-item-header">Total</div>
            <div className="cart-item-header">Remove</div>
          </li>
          {cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </ul>

        <h2>Total Bill: ₹{calculateTotalBill()}</h2>
      </main>
    </div>
  );
}

export default App;


