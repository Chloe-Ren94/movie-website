import React from "react";
import Navigation from "../Navigation";
import {useSelector} from "react-redux";
import Lists from "../ProfileScreen/Lists";
import Reviews from "../ProfileScreen/Reviews";
import WhatsHappening from "./WhatsHappening";

const HomeScreen = () => {
    const profile = useSelector(state => state.profile);

    return(
        <div className="mt-5 container">
            <Navigation/>
            {
                profile._id &&
                <div className="mt-5">
                    <h2>Hello {profile.username}</h2>
                    <Lists profile={profile}/>
                    <Reviews profile={profile}/>
                </div>
            }
            {
                !profile._id &&
                <div className="mt-5">
                    <h2>Hello visitor!</h2>
                    <WhatsHappening/>
                </div>
            }
        </div>
    )
}
export default HomeScreen;