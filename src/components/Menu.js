import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({ items }) => {
    return (
        <div className="menu">
            {items.map((item, index) => (
                <MenuItem key={index} id={index} name={item.name} price={item.price} image={item.image} />
            ))}
        </div>
    );
};


export default Menu;
