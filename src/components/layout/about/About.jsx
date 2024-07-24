import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import me from "../../../images/me.jpg";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/meabhisingh";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{
                                width: "10vmax",
                                height: "10vmax",
                                margin: "2vmax 0",
                            }}
                            src={me}
                            alt="Founder"
                        />
                        <Typography>Aayush Soni</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @saffron_aayush.
                            Only with the purpose to learn MERN Stack from the
                            channel 6 Pack Programmer
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            target="blank"
                        >
                            <YouTubeIcon className="youtubeSvgIcon" />
                        </a>

                        <a
                            href="https://instagram.com/saffron_aayush"
                            target="blank"
                        >
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
