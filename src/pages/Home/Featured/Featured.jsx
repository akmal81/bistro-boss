import React from 'react';
import SectionTiltle from '../../../components/SectionTitle/SectionTiltle';
import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className='bg-featuredbg bg-no-repeat bg-fixed bg-cover bg-center text-white py-20'>
            <SectionTiltle 
            heading={'from our menu'} 
            subHeading={'check in out'} />
            <div className='text-white  md:flex items-center justify-center gap-10 py-8 px-16'>
                <div className='bg-featuredbg'>
                    <img src={featuredImg} className='w-[648px]' alt="" />
                </div>
                <div>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ea labore earum, fugiat amet ratione perferendis iure facere nulla illo! Tempora eveniet commodi quisquam consequuntur ullam qui temporibus quia veritatis.</p>
                    <button className='btn btn-outline'>Order More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;