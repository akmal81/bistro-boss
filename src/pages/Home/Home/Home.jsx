import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";

import PopularMenu from "../PopularMenu/PopularMenu";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>Home || Bistro Boss</title>
            </Helmet>
            <Banner />
            <Category />
            <PopularMenu/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;