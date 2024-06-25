import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Navigation onCategorySelect={handleCategorySelect} />
                    <Routes>
                        <Route path="/" element={<Menu items={menuItemsData[selectedCategory]} />} />
                        <Route path="/item/:itemId" element={<ItemDetails items={menuItemsData[selectedCategory]} onAddToCart={handleAddToCart} />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation cart={cart} removeFromCart={removeFromCart} />} />
                    </Routes>
                </div>
                <Footer cart={cart} />
            </div>
        </Router>
    );
}

export default App;