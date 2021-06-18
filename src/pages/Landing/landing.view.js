import React from 'react';
import styled from 'styled-components';
import { ContentBox } from "../../ui";
import { WelcomeTextSection, LoginCard, SignUpCard } from "./components";
import meetingImage from "../../assets/meeting.jpeg"

const FullPageContentBox = styled(ContentBox)`
display: block;
width: 100%;
height: 100vh;
background: linear-gradient(0deg, rgba(19, 23, 60, 0.7), rgba(19, 23, 60, 0.7)), url(${meetingImage});
background-size: cover;
background-position: center;
`
const VerticalFlexBox = styled(ContentBox)`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
margin-left: 142px;
`

export const LandingPage = () => {
    var pathName = window.location.pathname;
    return (
        <FullPageContentBox>
            <VerticalFlexBox>
                <WelcomeTextSection />
            </VerticalFlexBox>
            <VerticalFlexBox>
                {pathName === "/" ? <LoginCard /> : <></>}
                {pathName === "/login" ? <LoginCard /> : <></>}
                {pathName === "/signup" ? <SignUpCard /> : <></>}
            </VerticalFlexBox>
        </FullPageContentBox>
    )
}