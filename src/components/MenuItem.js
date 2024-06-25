import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ id, image, name, price }) => {
    return (
        <div className="menu-item">
            <Link to={`/item/${id}`}>
                <img src={`/images/${image}`} alt={name}/>
                <div className="menu-item-info">
                <h3>{name}</h3>
                <p>from RM {price}</p>
            </div>
            </Link>
        </div>
    );
};

export default MenuItem;
