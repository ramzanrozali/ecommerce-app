import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ItemDetails.css';

const ItemDetails = ({ items, onAddToCart }) => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Flatten items object into an array of items
    const allItems = Object.values(items).flat();

    // Find the item by itemId
    const item = allItems.find(i => i.id === parseInt(itemId, 10));

    useEffect(() => {
        if (item && item.variants.length > 0) {
            setSelectedVariant(item.variants[0]);
        }
    }, [item]);

    if (!item) {
        return <div>Item not found</div>;
    }

    const handleAddToCart = () => {
        const cartItem = { ...item, ...selectedVariant, quantity };
        onAddToCart(cartItem);
        // navigate('/order-confirmation');
    };

    const handleVariantChange = (variantId) => {
        const variant = item.variants.find(v => v.id === variantId);
        setSelectedVariant(variant);
    };

    return (
        <div className="item-details">
            <button onClick={() => navigate(-1)}>Back</button>
            <img src={`/images/${item.image}`} alt={item.name}/>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            {item.variants.length > 0 && (
                <div className="item-variants">
                    <label>Choose a variant:</label>
                    <div className="variant-buttons">
                        {item.variants.map((variant) => (
                            <button
                                key={variant.id}
                                className={`variant-button ${selectedVariant && selectedVariant.id === variant.id ? 'selected' : ''}`}
                                onClick={() => handleVariantChange(variant.id)}
                            >
                                {variant.variantName} - RM {variant.price}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="item-price">
                <span>Price: RM {selectedVariant ? selectedVariant.price : item.price}</span>
            </div>
            <div className="item-price">
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