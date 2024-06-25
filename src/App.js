import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ItemDetails from './components/ItemDetails';
import OrderConfirmation from './components/OrderConfirmation';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import Footer from './components/Footer';
import './App.css';
import './css/footer.css';
import menuItemsData from './data/MenuItems.json';

function App() {
    const [selectedCategory, setSelectedCategory] = useState(2);
    const [cart, setCart] = useState([]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleAddToCart = (item) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                return updatedCart;
            } else {
                return [...prevCart, item];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    const location = useLocation();

    return (
        <div className="App">
            <Header />
            <div className="content">
                <Navigation onCategorySelect={handleCategorySelect} />
                <Routes>
                    <Route path="/" element={<Menu items={menuItemsData[selectedCategory]} />} />
                    <Route path="/category/:categoryId" element={<Menu items={menuItemsData[selectedCategory]} onCategorySelect={handleCategorySelect} />} />
                    <Route path="/item/:itemId" element={<ItemDetails items={menuItemsData} onAddToCart={handleAddToCart} />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation cart={cart} removeFromCart={removeFromCart} />} />
                </Routes>
            </div>
            {location.pathname !== '/order-confirmation' && <Footer cart={cart} />}
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
