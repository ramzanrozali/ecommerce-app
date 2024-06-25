import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ItemDetails from './components/ItemDetails';
import OrderConfirmation from './components/OrderConfirmation';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation'; // Import the new component
import Home from './components/Home'; // Create this component
import Products from './components/Products'; // Create this component
import Recipes from './components/Recipes'; // Create this component
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

    const shouldShowNavigation = () => {
        return location.pathname === '/products' || location.pathname.startsWith('/category/') || location.pathname.startsWith('/item/');
    };

    const shouldShowFooter = () => {
        return location.pathname.startsWith('/category/') || location.pathname.startsWith('/product/') || location.pathname.startsWith('/item/');
    };

    const shouldShowBottom = () => {
        return location.pathname.startsWith('/') || location.pathname.startsWith('/home/') || location.pathname.startsWith('/recipes/');
    };

    return (
        <div className="App">
            <Header />
            {shouldShowNavigation() && (
                <Navigation onCategorySelect={handleCategorySelect} />
            )}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Menu items={menuItemsData[selectedCategory]} />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/category/:categoryId" element={<Menu items={menuItemsData[selectedCategory]} onCategorySelect={handleCategorySelect} />} />
                    <Route path="/item/:itemId" element={<ItemDetails items={menuItemsData} onAddToCart={handleAddToCart} />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation cart={cart} removeFromCart={removeFromCart} />} />
                </Routes>
            </div>
            {/*{location.pathname !== '/order-confirmation' && <Footer cart={cart} />}*/}
            {/*{location.pathname === '/home' || location.pathname === '/recipes' }*/}
            {shouldShowFooter() && <Footer cart={cart} />}
            {shouldShowBottom() && (
                <BottomNavigation />
            )}
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