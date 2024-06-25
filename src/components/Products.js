import React from 'react';
import Navigation from './Navigation';
import Menu from './Menu';
import menuItemsData from '../data/MenuItems.json';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = React.useState(2);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div>
            <Navigation onCategorySelect={handleCategorySelect} />
            <Menu items={menuItemsData[selectedCategory]} />
        </div>
    );
};

export default Products;
