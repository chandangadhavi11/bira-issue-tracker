import React, { useState, useEffect } from 'react';
import { Card, ContentBox, Text } from '../../../../ui';
import styled from "styled-components"
import { GetHPIssuesList, GetIssuesList } from '../../../../services';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';
import { Line } from 'react-chartjs-2';
const { Option } = AutoComplete;




const FullWidthContentBox = styled(ContentBox)`
width: 100%;
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
width: 100%;
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

const SearchInput = styled(AutoComplete)`
border: none;
outline: none;
margin-left: 6px;
font-size: 16px;
font-weight: 500;

.ant-select-selector {
    background-color: #fff;
    border: 1px solid #ffffff;
}
`

const ProfileButton = styled.div`
width: 34px;
height: 34px;
border-radius: 24px;
background: #000000;
`

const SearchBarSection = ({ props, data }) => {

    const options =
        data.map((issue) => {
            return { value: `ID: ${issue.id} | ${issue.title}` }
        })

    return (
        <SearchbarBox display="block">
            <SearchBarHorizontalFlexBox marginLeft={28}>
                <SearchLogo />
                <SearchInput
                    style={{ width: "800px" }}
                    options={options}
                    placeholder="search..."
                    onSelect={(a) => {
                        window.location.assign(`issues/${a.split(" ")[1]}`)
                    }}
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
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
height: fit-content;
min-width: 0px;
min-height: 400px;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
border-radius: 2px;
margin-top: 16px;
margin-bottom: 24px;
padding: 24px 0px;
`

const GraphBox = styled(Line)`
width: 100%;
height: 200px;
max-height: 300px;
margin-top: 16px;
`

const OverFlowText = styled(Text)`
    display: inline;
    -webkit-line-clamp: ${props => props.numOfLines ? props.numOfLines : "1"};
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;/* Important for long words! */
`
const HoverVFB = styled(VerticalFlexBox)`
height: 94px;
padding: 14px;
:hover{
    background: #eaeaea;
}
`
const Issue = ({ data }) => {

    let history = useHistory()
    return (

        <HoverVFB style={{ cursor: "pointer" }}
            onClick={() => {
                history.push(`/issues/${data.id}`)
            }}>
            <ContentBox display="block">
                <OverFlowText numOfLines={1} color="#333A4C" size={17} fontWeight={600} style={{ maxWidth: "180px" }}>{data.title}</OverFlowText>
                <Text color="#C7CFD7" size={12} float="right" marginTop={4}>January 12, 2019</Text>
            </ContentBox>
            <ContentBox>
                <OverFlowText numOfLines={2} color="#7D8EA2" size={12} marginTop={4}>{data.description}</OverFlowText>
            </ContentBox>
        </HoverVFB>
    )
}



export const DashboardSection = () => {

    const { issueData, issueLoading, issueError } = GetIssuesList();
    const { hPData, hPLoading, hPError } = GetHPIssuesList();


    const monthDays = []
    for (var i = 1; i <= 31; i++) {
        monthDays.push(i);
    }

    const data = {
        labels: monthDays,
        datasets: [

            {
                label: 'Showstopper',
                data: monthDays.map(() => Math.floor(Math.random() * 20) + 10),
                pointRadius: 0,
                fill: true,
                backgroundColor: 'rgba(98, 122, 246, 0.8)',
                borderColor: 'rgba(98, 122, 246, 0.2)',
                lineTension: 0.4,

            },
            {
                label: 'Number of Issues this month',
                data: monthDays.map(() => Math.floor(Math.random() * 20) + 10),
                pointRadius: 0,
                fill: true,
                backgroundColor: 'rgba(191, 140, 229, 0.8)',
                borderColor: 'rgba(191, 140, 229, 0.2)',
                lineTension: 0.4,

            }
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <FullWidthContentBox >
            <VerticalFlexBox>
                <SearchBarSection data={!issueLoading ? issueData : []} />
                <VerticalFlexBox fullWidth={true}>
                    <ContentBox marginLeft={30} marginTop={32}>
                        <Text size={28} fontWeight={600} color="#000000">Dashboard</Text>
                    </ContentBox>
                    <DashboardCard marginTop={24} marginRight={32} marginLeft={32}>
                        <Text size={20} fontWeight={400} color="#000000" marginTop={8}>Number Of Issue of the Month</Text>
                        <GraphBox data={data} options={options} />
                    </DashboardCard>
                </VerticalFlexBox>
                <ContentBox fullWidth={true}>
                    <HorizontalFlexBox>
                        <DashboardCard2 marginRight={24}>
                            <VerticalFlexBox style={{ width: "100%" }}>
                                <Text color="black" size={20} marginLeft={24}>High Priority</Text>
                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea", marginTop: "16px" }}></div>


                                {/* Here */}
                                {!hPLoading ?
                                    hPData.slice(0, 5).map((issue, index) => {
                                        return (
                                            <VerticalFlexBox>
                                                <Issue key={index} data={issue} />
                                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea" }} />
                                            </VerticalFlexBox>

                                        )
                                    }) : <></>}
                                <ContentBox fullWidth={true} display="block">
                                    <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600}>View All</Text>
                                </ContentBox>
                            </VerticalFlexBox>
                        </DashboardCard2>
                        <DashboardCard2 marginRight={24}>
                            <VerticalFlexBox style={{ width: "100%" }}>
                                <Text color="black" size={20} marginLeft={24}>Recently Updated Issue</Text>
                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea", marginTop: "16px" }}></div>

                                {/* Here */}
                                {!issueLoading ?
                                    issueData.slice(0, 5).map((issue, index) => {
                                        return (
                                            <VerticalFlexBox>
                                                <Issue key={index} data={issue} />
                                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea" }} />
                                            </VerticalFlexBox>

                                        )
                                    }) : <></>}
                                <ContentBox fullWidth={true} display="block">
                                    <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600}>View All</Text>
                                </ContentBox>
                            </VerticalFlexBox>
                        </DashboardCard2>
                        <DashboardCard2 marginRight={24}>
                            <VerticalFlexBox style={{ width: "100%" }}>
                                <Text color="black" size={20} marginLeft={24}>All Issue</Text>
                                <hr style={{ width: "100%", border: "1px solid #eaeaea" }}></hr>

                                {/* Here */}



                                <ContentBox fullWidth={true} display="block">
                                    <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600}>View All</Text>
                                </ContentBox>
                            </VerticalFlexBox>
                        </DashboardCard2>
                    </HorizontalFlexBox>
                </ContentBox>
            </VerticalFlexBox>
        </FullWidthContentBox>
    )
}