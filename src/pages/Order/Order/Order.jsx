import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'desserts', 'drinks']
    const {category} = useParams();

    const initialIndex = categories.indexOf(category)

    const [tabIdx, setTabIdx] = useState(initialIndex);

    const [menu] = useMenu();

    
    console.log(category)

    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Cover img={orderCover} title="order food" hight={700} />
            <Tabs
                className='mt-40 
                    border-none 
                    text-center'
                defaultIndex={tabIdx}
                onSelect={(index) =>
                    setTabIdx(tabIdx)}>
                <TabList className='border-none 
                flex-row 
                flex 
                items-center 
                justify-center 
                gap-10 
                font-bold
                mb-10'>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drink</Tab>
                </TabList>
                <TabPanel>
                   <OrderTab items={salad}/>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}/>
                </TabPanel>
                <TabPanel>
                    <OrderTab items ={soup}/>
                </TabPanel>
                <TabPanel>
                    <OrderTab items = {desserts}/>
                </TabPanel>
                <TabPanel>
                   <OrderTab items ={drinks}/>
                </TabPanel>
            </Tabs>

        </div>
    );
};

export default Order;