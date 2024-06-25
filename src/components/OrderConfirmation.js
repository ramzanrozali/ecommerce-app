import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OrderConfirmation.css';

const OrderConfirmation = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();
    console.log('cart', cart);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="order-confirmation">
            <button onClick={() => navigate('/')}>Back to List</button>
            <h2>Order Confirmation</h2>
            <div className="pickup-location">
                <h3>Delivery:</h3>
                <p>No. 59, Jalan 2/16, Bandar Baru Selayang, 68100 Batu Caves, Selangor</p>
            </div>
            <div className="your-order">
                <h3>Your Order</h3>
                {cart.map((item, index) => (
                    <div key={index} className="order-item">
                        <img src={`/images/${item.image}`} alt={item.name}/>
                        <div className="order-item-info">
                            <h4>{item.name}</h4>
                            <p>RM {item.price}</p>
                            <p>Qty: {item.quantity}</p>
                            {/* Add other details like milk type, etc. if needed */}
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-total">
                <h4>Total Amount: RM {totalAmount.toFixed(2)}</h4>
            </div>
            <button className="pay-now">Pay Now</button>
        </div>
    );
};

export default OrderConfirmation;