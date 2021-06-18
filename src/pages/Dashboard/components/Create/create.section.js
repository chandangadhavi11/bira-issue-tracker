import React from 'react';
import { Card, ContentBox, Text } from '../../../../ui';
import styled from "styled-components"

const FullWidthContentBox = styled(ContentBox)`
width: calc(100vw - 280px);
height: 100vh;
display: flex; 
flex-direction: column;
background: #F4F4F5;
overflow-x: hidden;
overflow-y: scroll;
`

const SearchbarBox = styled(ContentBox)`
width: 100%;
height: 70px;
background: #ffffff;
`

const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
`

const HorizontalFlexBox = styled(ContentBox)`
width: calc(100vw - 280px);;
/* Auto Layout */

display: grid;
grid-template-columns: calc(100%/3) calc(100%/3) calc(100%/3);
padding: 10px;
margin-left: 22px;
`

const SearchBarHorizontalFlexBox = styled(ContentBox)`
height: 100%;
display: flex;
flex-direction: row;
align-items: center;
`

const SearchLogo = styled.div`
width: 24px;
height: 24px;
background: black;
`

const SearchInput = styled.input`
border: none;
outline: none;
margin-left: 6px;
font-size: 16px;
font-weight: 500;
`

const ProfileButton = styled.div`
width: 34px;
height: 34px;
border-radius: 24px;
background: #000000;
`

const SearchBarSection = () => {
    return (
        <SearchbarBox display="block">
            <SearchBarHorizontalFlexBox marginLeft={28}>
                <SearchLogo />
                <SearchInput placeholder="search..." />
            </SearchBarHorizontalFlexBox>
            <SearchBarHorizontalFlexBox float="right" marginRight={38}>
                <ProfileButton />
            </SearchBarHorizontalFlexBox>
        </SearchbarBox>
    )
}

const DashboardCard = styled(Card)`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
border-radius: 2px;
flex-direction: column;
`

const DashboardCard2 = styled(Card)`
min-width: 0px;
min-height: 400px;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
border-radius: 2px;
margin-top: 16px;
margin-bottom: 24px;
padding: 24px 0px;
`

const GraphBox = styled.div`
width: 100%;
background: black;
height: 300px;
margin-top: 16px;
`

export const CreateSection = () => {
    return (
        <FullWidthContentBox >
            <VerticalFlexBox>

            <VerticalFlexBox fullWidth={true}>
                <ContentBox marginLeft={30} marginTop={32}>
                    <Text size={28} fontWeight={600} color="#000000">Create</Text>
                </ContentBox>
                <DashboardCard marginTop={24} marginRight={32} marginLeft={32}>
                    <Text size={20} fontWeight={400} color="#000000" marginTop={8}>Number Of Issue of the Month</Text>
                    <GraphBox />
                </DashboardCard>
            </VerticalFlexBox>
            <ContentBox fullWidth={true}>
                <HorizontalFlexBox>
                    <DashboardCard2 marginRight={24}>
                        <VerticalFlexBox style={{width: "100%"}}>
                            <Text color="black" size={20} marginLeft={24}>High Priority</Text>
                            <hr style={{width: "100%", border: "1px solid #eaeaea"}}></hr>
                            <ContentBox fullWidth={true} display="block">
                                <Text float="right" color="#4D60F6" marginRight={24} marginTop={12} fontWeight={600}>View All</Text>
                            </ContentBox>
                        </VerticalFlexBox>
                    </DashboardCard2>
                    <DashboardCard2 marginRight={24}>
                        <VerticalFlexBox style={{width: "100%"}}>
                            <Text color="black" size={20} marginLeft={24}>Recently Updated Issue</Text>
                            <hr style={{width: "100%", border: "1px solid #eaeaea"}}></hr>
                            <ContentBox fullWidth={true} display="block">
                                <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600} marginTop={12}>View All</Text>
                            </ContentBox>
                        </VerticalFlexBox>
                    </DashboardCard2>
                    <DashboardCard2 marginRight={24}>
                        <VerticalFlexBox style={{width: "100%"}}>
                            <Text color="black" size={20} marginLeft={24}>All Issue</Text>
                            <hr style={{width: "100%", border: "1px solid #eaeaea"}}></hr>
                            <ContentBox fullWidth={true} display="block">
                                <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600} marginTop={12}>View All</Text>
                            </ContentBox>
                        </VerticalFlexBox>
                    </DashboardCard2>
                </HorizontalFlexBox>
            </ContentBox>
            </VerticalFlexBox>
        </FullWidthContentBox>
    )
}