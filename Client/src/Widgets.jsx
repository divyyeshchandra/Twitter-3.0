import React from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets(){
    return(
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon"/>
                <input placeholder="Search Twitter" type="text"/>
            </div>
            <div className="widgets__widgetContainer">
                
                <h2>Whats's happening</h2>

                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="Divyyeshchandr1"
                    options={{height:800}}
                />

            </div>
        </div>
    )
}

export default Widgets;