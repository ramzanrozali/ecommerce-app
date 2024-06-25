import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css'; // Import the CSS file

const Menu = ({ items }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input" // Apply the CSS class
                />
            </div>
            <div className="menu">
                {filteredItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <Link to={`/item/${item.id}`}>
                            <img src={`/images/${item.image}`} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>from RM {item.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;