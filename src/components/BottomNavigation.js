// BottomNavigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BottomNavigation.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faHome, faUtensils} from "@fortawesome/free-solid-svg-icons"; // Create this CSS file for styling

const BottomNavigation = () => {
    return (
        <div className="bottom-navigation">
            <Link to="/">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </Link>
            <Link to="/products">
                <FontAwesomeIcon icon={faBox} />
                <span>Products</span>
            </Link>
            <Link to="/recipes">
                <FontAwesomeIcon icon={faUtensils} />
                <span>Recipes</span>
            </Link>
        </div>
    );
};

export default BottomNavigation;
