import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSeedling, faCartShopping, faLemon, faFish, faCow} from '@fortawesome/free-solid-svg-icons';
import navigationItems from '../data/navigationItems.json';
const iconMap = {
    faSeedling,
    faCow,
    faFish,
    faLemon,
    faCartShopping
};
const Navigation = ({ onCategorySelect }) => {
    return (
        <nav className="navigation">
            <ul>
                {navigationItems.map((item) => (
                    <li key={item.id} onClick={() => onCategorySelect(item.id)}>
                        <FontAwesomeIcon icon={iconMap[item.icon]}/> {item.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
