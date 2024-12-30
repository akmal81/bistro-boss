import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import img from "../../../assets/menu/banner3.jpg";
import useMenu from '../../../hooks/useMenu';
import SectionTiltle from '../../../components/SectionTitle/SectionTiltle';
import MenuCategory from './MenuCategory/MenuCategory';

import dessertCoverImage from '../../../assets/menu/dessert-bg.jpeg'


const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Menu || Bistro Boss</title>
            </Helmet>
            <Cover
                img={img}
                title='Our Menu'
                hight={700}
                para='Would you like to try a dish?' />

            {/* main cover */}
            <SectionTiltle
                subHeading="Don't Miss today offer"
                heading='todays offer'
            />
            {/* offered menu items */}
            <MenuCategory items={offered} />

            {/* dessert items */}

            <MenuCategory items={desserts} title='desserts' coverImage={dessertCoverImage} />
            {/* pizza */}
            <MenuCategory items={pizza} title='pizza' coverImage={dessertCoverImage} />
            {/* salad */}
            <MenuCategory items={salad} title='salad' coverImage={dessertCoverImage} />
            {/* soup */}
            <MenuCategory items={soup} title='soup' coverImage={dessertCoverImage} />





        </div>
    );
};

export default Menu;