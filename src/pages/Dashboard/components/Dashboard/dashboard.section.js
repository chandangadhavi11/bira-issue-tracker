import React, { useState, useEffect } from 'react';
import { Card, ContentBox, Text } from '../../../../ui';
import styled from "styled-components"
import { GetHPIssuesList, GetIssuesList, GetUserList } from '../../../../services';
import { SearchBarSection } from "../../../components"
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

const ProfileButton = styled.div`
width: 34px;
height: 34px;
border-radius: 24px;
background: ${props => props.bgUrl ? `url(${props.bgUrl})` : "black"};
background-size: cover;
background-position: center;
`


const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
`
const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
`


const FullHorizontalFlexBox = styled(ContentBox)`
width: 100%;
/* Auto Layout */

display: grid;
grid-template-columns: calc(100%/3) calc(100%/3) calc(100%/3);
padding: 10px;
margin-left: 22px;
`


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
padding: 20px;
:hover{
    background: #eaeaea;
}
`

const ProgressBarBack = styled.div`
position: absolute;
width:100%;
height: 5px;
background: #E6E9F1;
border-radius: 20px;
`
const ProgressBarFront = styled.div`
position: absolute;
width:50%;
height: 5px;
background: #A862EE;
border-radius: 20px;
`

const Issue = ({ data }) => {
    let history = useHistory()
    const getDateText = (text) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = text.slice(8, 10);
        const month = months[text.slice(6, 7) - 1];
        const year = text.slice(0, 4);
        return `${month} ${date}, ${year}`
    }
    return (

        <HoverVFB style={{ cursor: "pointer" }}
            onClick={() => {
                history.push(`/issues/${data.id}`)
            }}>
            <ContentBox display="block">
                <OverFlowText numOfLines={1} color="#333A4C" size={17} fontWeight={600} style={{ maxWidth: "180px" }}>{data.title}</OverFlowText>
                <Text color="#C7CFD7" size={12} float="right" marginTop={4}>{getDateText(data.created_at)}</Text>
            </ContentBox>
            <ContentBox>
                <OverFlowText numOfLines={2} color="#7D8EA2" size={12} marginTop={4}>{data.description}</OverFlowText>
            </ContentBox>
        </HoverVFB>
    )
}

const AllIssue = ({ data }) => {
    let history = useHistory()
    return (

        <HoverVFB style={{ cursor: "pointer" }}
            onClick={() => {
                history.push(`/issues/${data.id}`)
            }}>
            <VerticalFlexBox>
                <HorizontalFlexBox>
                    <ProfileButton bgUrl={data.profile_pic} />
                    <VerticalFlexBox marginLeft={8}>
                        <Text color="#292D32" size={14}>{data.first_name} {data.last_name}</Text>
                        <Text color="#78899F" size={10} marginTop={-2}>{data.title}</Text>
                    </VerticalFlexBox>
                </HorizontalFlexBox>
                <ContentBox marginTop={8} fullWidth style={{ position: "relative" }}>
                    <ProgressBarBack />
                    <ProgressBarFront />
                </ContentBox>
                <ContentBox fullWidth={true} display="block" >
                    <HorizontalFlexBox marginTop={12} >
                        <Text size={12} color="#949698">High Priority Issue:</Text>
                        <Text size={12} fontWeight={600} color="#949698" marginLeft={2}>{0}</Text>
                    </HorizontalFlexBox>

                    <HorizontalFlexBox float="right" marginTop={12}>

                        <Text size={12} color="#949698">Total Issue: </Text>
                        <Text size={12} fontWeight={600} color="#949698" marginLeft={2}>{0}</Text>
                    </HorizontalFlexBox>
                </ContentBox>
            </VerticalFlexBox>
        </HoverVFB>
    )
}



export const DashboardSection = () => {

    var { issueData, issueLoading, issueError } = GetIssuesList();
    var { userListData, userListLoading, userListError } = GetUserList();
    const { hPData, hPLoading, hPError } = GetHPIssuesList();
    function reverseArr(input) {
        var ret = new Array;
        for (var i = input.length - 1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }
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
                    <FullHorizontalFlexBox>
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
                                    reverseArr(issueData).slice(0, 5).map((issue, index) => {
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
                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea", marginTop: "16px" }}></div>


                                {/* Here */}
                                {!userListLoading ?
                                    userListData.slice(0, 4).map((user, index) => {
                                        return (
                                            <VerticalFlexBox>
                                                <AllIssue data={user} />
                                                <div style={{ width: "100%", height: "0.1px", background: "#eaeaea", marginTop: "24px" }} />
                                            </VerticalFlexBox>
                                        )
                                    }) : <></>}
                                <ContentBox fullWidth={true} display="block">
                                    <Text float="right" color="#4D60F6" marginRight={24} fontWeight={600}>View All</Text>
                                </ContentBox>
                            </VerticalFlexBox>
                        </DashboardCard2>
                    </FullHorizontalFlexBox>
                </ContentBox>
            </VerticalFlexBox>
        </FullWidthContentBox>
    )
}