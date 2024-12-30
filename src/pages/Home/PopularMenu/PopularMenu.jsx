import { useEffect, useState } from 'react';
import SectionTiltle from '../../../components/SectionTitle/SectionTiltle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category ==='popular')


    return (
        <section className='mb-8'>
            <SectionTiltle heading={'from our menu'} subHeading={'Check it out'} />
            <div className='grid md:grid-cols-2 gap-6'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item} />)
                }
            </div>
        </section>
    );
};

export default PopularMenu;