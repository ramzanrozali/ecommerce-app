import React from 'react';
import {useNavigate} from "react-router-dom";

const Footer = ({ cart }) => {
    const navigate = useNavigate();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleOrderNow = () => {
        navigate('/order-confirmation');
    };

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="item-info">
                    <span>{itemCount} items</span>
                    <span>RM {totalAmount.toFixed(2)}</span>
                </div>
                <div className="item-info2">
                    <button className="order-now" onClick={handleOrderNow}>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
