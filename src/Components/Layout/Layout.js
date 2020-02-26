import React from "react";
import classes from "./Layout.module.css";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import Footer from "../UI/Footer/Footer";
import Tappat from "../../Containers/Tappat/Tappat";


const layout = (props) => (
    <div className={classes.Layout}>
        <Tappat/>
        <SideDrawer/>
        <Footer/>
    </div>
);

export default layout;