import React from 'react';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };
    return (
        <header className="header">
            <div className="location" onClick={handleNavigateHome}>
                eCommerce App
            </div>
            <div className="delivery-pickup">
                <button className="delivery active">Delivery</button>
                {/*<button className="pickup active">Pickup</button>*/}
            </div>
        </header>
    );
};

export default Header;
