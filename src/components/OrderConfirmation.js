import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../utils/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/OrderConfirmation.css';

const OrderConfirmation = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [state, setState] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0.00);
    const [distance, setDistance] = useState(0);
    const [itemToRemove, setItemToRemove] = useState(null); // New state variable for item to remove

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const voucherDiscount = 0.00; // Example voucher discount
    const sst = totalAmount * 0.06; // 6% SST

    const BASE_CENTER = { lat: 3.2439930459613837, lng: 101.66489216335326 }; // Base center coordinates

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
        const fullAddress = `${address}, ${postcode}, ${state}, Malaysia`;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
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

    const debouncedCalculateDistance = useCallback(debounce(calculateDistance, 500), [address, postcode, state]);

    useEffect(() => {
        if (address && postcode && state) {
            debouncedCalculateDistance();
        }
    }, [address, postcode, state, debouncedCalculateDistance]);

    const handleRemoveClick = (itemId) => {
        setItemToRemove(itemId);
    };

    const confirmRemove = () => {
        removeFromCart(itemToRemove);
        setItemToRemove(null);
    };

    const cancelRemove = () => {
        setItemToRemove(null);
    };

    const grandTotal = totalAmount - voucherDiscount + deliveryFee;
    const pointsEarned = Math.floor(grandTotal);

    return (
        <div className="order-confirmation">
            <button onClick={() => navigate('/')}>Back to List</button>
            <h3>Order Confirmation</h3>
            <div className="customer-info">
                <h3>Customer Information</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="pickup-location">
                <h4>Delivery Address</h4>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    required
                />
                <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter your postcode"
                    required
                />
                <select value={state} onChange={(e) => setState(e.target.value)} required>
                    <option value="">Select your state</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Selangor">Selangor</option>
                </select>
            </div>
            <div className="your-order">
                <h4>Your Order</h4>
                {cart.map((item, index) => (
                    <div key={index} className="order-item">
                        <img src={`/images/${item.image}`} alt={item.name} />
                        <div className="order-item-info">
                            <h4>{item.name}</h4>
                            {item.variantName && <p>Selected: {item.variantName}</p>}
                            <p>RM {item.price}</p>
                            <p>Qty: {item.quantity}</p>
                            <button onClick={() => handleRemoveClick(item.id)}>
                                <FontAwesomeIcon icon={faTrash} /> {/* Change to FontAwesome bin icon */}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="special-remarks">
                <h4>Special Remarks</h4>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add any special instructions here"
                />
            </div>
            <div className="payment-details">
                <h4>Payment Details</h4>
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
                    <span>{pointsEarned} pts</span>
                </div>
            </div>
            <button className="pay-now" disabled={grandTotal <= 50}>Pay Now</button>

            {itemToRemove !== null && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to remove this item?</p>
                    <button onClick={confirmRemove}>Yes</button>
                    <button onClick={cancelRemove}>No</button>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;
