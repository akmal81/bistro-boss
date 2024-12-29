import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";

import PopularMenu from "../PopularMenu/PopularMenu";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";

const Home = () => {


    return (
        <div>
            <Banner />
            <Category />
            <PopularMenu/>
            <Featured/>
        </div>
    );
};

export default Home;