import React from 'react';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import Cover from '../../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, coverImage }) => {
    return (

        <div>
            {title && <Cover
                img={coverImage}
                title={title}
                para='Would you like to try a dish?'
            />}

            <div className='grid md:grid-cols-2 gap-6 py-20'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item} />)
                }
            </div>
            <div className=' flex items-center justify-center mb-10'>
                <Link to={`/order/${title}`} className=' text-center'>
                    <button className='btn btn-outline border-0 border-b-4 mt-4'> Order Now</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;