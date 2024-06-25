import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../utils/debounce';
import '../css/OrderConfirmation.css';

const OrderConfirmation = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0.00);
    const [distance, setDistance] = useState(0);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const voucherDiscount = 0.00; // Example voucher discount
    const sst = totalAmount * 0.06; // 6% SST

    const BASE_CENTER = { lat: 3.2439930459613837, lng: 101.66489216335326 };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const calculateDistance = async () => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
            const destination = data.results[0].geometry.location;
            const distanceInKm = getDistanceFromLatLonInKm(
                BASE_CENTER.lat,
                BASE_CENTER.lng,
                destination.lat,
                destination.lng
            );
            setDistance(distanceInKm);
            setDeliveryFee(distanceInKm * 2); // Example calculation: RM2 per km
        }
    };

    const debouncedCalculateDistance = useCallback(debounce(calculateDistance, 500), [address]);

    useEffect(() => {
        if (address) {
            debouncedCalculateDistance();
        }
    }, [address, debouncedCalculateDistance]);

    const grandTotal = totalAmount - voucherDiscount + deliveryFee;

    return (
        <div className="order-confirmation">
            <button onClick={() => navigate('/')}>Back to List</button>
            <h2>Order Confirmation</h2>
            <div className="pickup-location">
                <h3>Delivery Address:</h3>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address here"
                />
            </div>
            <div className="your-order">
                <h3>Your Order</h3>
                {cart.map((item, index) => (
                    <div key={index} className="order-item">
                        <img src={`/images/${item.image}`} alt={item.name} />
                        <div className="order-item-info">
                            <h4>{item.name}</h4>
                            {item.variantName && <p>Selected: {item.variantName}</p>}
                            <p>RM {item.price}</p>
                            <p>Qty: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="special-remarks">
                <h3>Special Remarks</h3>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add any special instructions here"
                />
            </div>
            <div className="payment-details">
                <h3>Payment Details</h3>
                <div className="payment-detail">
                    <span>Amount</span>
                    <span>RM {totalAmount.toFixed(2)}</span>
                </div>
                <div className="payment-detail">
                    <span>Subtotal</span>
                    <span>RM {(totalAmount).toFixed(2)}</span>
                </div>
                <div className="payment-detail">
                    <span>Delivery fee</span>
                    <span>RM {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="payment-detail grand-total">
                    <span>Grand Total</span>
                    <span>RM {grandTotal.toFixed(2)}</span>
                </div>
                <div className="payment-detail">
                    <span>Points Earned</span>
                    <span>10 pts</span>
                </div>
            </div>
            {/*<button className="pay-now" disabled={grandTotal <= 50}>Pay Now</button>*/}
        </div>
    );
};

export default OrderConfirmation;