import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ItemDetails.css';

const ItemDetails = ({ items, onAddToCart }) => {
    const { itemId } = useParams();
    const item = items[itemId];
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    if (!item) {
        return <div>Item not found</div>;
    }

    const handleAddToCart = () => {
        const cartItem = { ...item, quantity };
        onAddToCart(cartItem);
        navigate('/order-confirmation');
    };

    return (
        <div className="item-details">
            <button onClick={() => navigate(-1)}>Back</button>
            <img src={`/images/${item.image}`} alt={item.name}/>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="item-price">
                <span>{item.price}</span>
                <div className="item-quantity">
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="number" value={quantity} readOnly/>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
        </div>
    );
};

export default ItemDetails;