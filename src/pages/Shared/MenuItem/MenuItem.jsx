import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className='flex gap-4'>
            <img style={{
                borderRadius: '0 200px 200px 200px'
            }} src={image} className='w-[120px]' alt="" />
            <div>
                <h3 className='uppercase text-xl'>{name}------------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>{price}</p>
        </div>
    );
};

export default MenuItem;