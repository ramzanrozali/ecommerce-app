import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ items }) => {
    return (
        <div className="menu">
            {items.map((item) => (
                <div key={item.id} className="menu-item">
                    <Link to={`/item/${item.id}`}>
                        <img src={`/images/${item.image}`} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>from RM {item.price}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Menu;