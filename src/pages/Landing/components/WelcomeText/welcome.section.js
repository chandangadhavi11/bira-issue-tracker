import React from 'react';
import { ContentBox, Text } from '../../../../ui';
import styled from "styled-components"

const Logo = styled.div`
width: 56px;
height: 56px;
background: white;
`
const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
`
const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
`

export const WelcomeTextSection = () => {
    return (
        <ContentBox float="left">
            <VerticalFlexBox>
                <HorizontalFlexBox>
                    <Logo/>
                    <Text size={36} marginLeft={8} marginTop={8}>BIRA</Text>
                </HorizontalFlexBox>
                <ContentBox>
                    <Text size={60} fontWeight={900} marginTop={8}>Welcome!</Text>
                </ContentBox>
                <ContentBox >
                    <Text size={22} width={500} marginTop={8} style={{lineHeight: "30px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                </ContentBox>
            </VerticalFlexBox>
        </ContentBox>
    )
}