import React, { useState } from 'react';
import { Card, ContentBox, Text } from '../../../../ui';
import styled from "styled-components"
import { SearchBarSection } from "../../../components"

import { GetTodoIssuesList, GetInProgressIssuesList, GetDoneIssuesList, GetIssuesList, GetUserList, GetUser } from "../../../../services"
import { useHistory } from 'react-router';

const FullWidthContentBox = styled(ContentBox)`
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
const CenteredFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
`
const HorizontalGridBox = styled(ContentBox)`
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
background: ${props => props.bgUrl ? `url(${props.bgUrl})` : "white"};
background-size: cover;
background-position: center;
`

const DashboardCard2 = styled(Card)`
background: #EBEDF3;
min-width: 0px;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
border-radius: 2px;
margin-top: 16px;
margin-bottom: 24px;
padding: 24px 0px;
`

const IssueCardCss = styled(Card)`
background: #ffffff;
min-width: 0px;
box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.0);
border-radius: 2px;
margin-bottom: 24px;
padding: 24px;
cursor: pointer;
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

const IssueCard = ({ data }) => {
    const { userData, userLoading, userError } = GetUser(data.assignee);
    let history = useHistory();
    const getDateText = (text) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = text.slice(8, 10);
        const month = months[text.slice(6, 7) - 1];
        const year = text.slice(0, 4);
        return `${month} ${date}, ${year}`
    }
    if(!userLoading){
        console.log(userData);
    }
    return (
        <IssueCardCss
            draggable onDragStart={() => console.log("dragging started")}
            onClick={() => {
                console.log("Clicked");
                history.push(`/issues/${data.id}`)
            }}>
            <VerticalFlexBox fullWidth={true}>
                <ContentBox display="block" fullWidth={true}>
                    <Text fontWeight={600} size={12} color="#292D32">ID: {data.short_id}</Text>
                    <Text float="right" size={12} color="#BBC4CF">{getDateText(data.created_at)}</Text>
                </ContentBox>
                <ContentBox marginTop={8}>
                    <OverFlowText size={20} color="#292D32">{data.title}</OverFlowText>
                </ContentBox>
                <ContentBox marginTop={8}>
                    <OverFlowText size={14} color="#78899F" numOfLines={2}>{data.description}</OverFlowText>
                </ContentBox>
                <ContentBox marginTop={8} display="block" fullWidth={true}>
                    <Text float="left" size={12} fontWeight={600} color="#949698">Assignee</Text>
                    <Text float="right" size={12} fontWeight={600} color="#949698">Priority</Text>
                </ContentBox>
                <ContentBox display="block" marginTop={4}>
                    <HorizontalFlexBox>
                        <ProfileButton bgUrl={userData.profile_pic}/>
                        <VerticalFlexBox marginLeft={8}>
                            <Text color="#292D32" size={14}>{!userLoading ? userData.first_name + " " + userData.last_name : ""}</Text>
                            <Text color="#78899F" size={10} marginTop={-2}>{!userLoading ? userData.title : ""}</Text>
                        </VerticalFlexBox>
                    </HorizontalFlexBox>
                    <CenteredFlexBox componentWidth={110} componentHeight={24} marginTop={4} float="right"
                        bgc={`
                                ${data.priority === "HIGH" ? "#D17B34" : ""}
                                ${data.priority === "MEDIUM" ? "#EDC54A" : ""}
                                ${data.priority === "LOW" ? "#9DA634" : ""}
                                ${data.priority === "VERY LOW" ? "#50942A" : ""}
                                ${data.priority === "SHOWSTOPPER" ? "#B83025" : ""}
                            `}
                        borderRadius={2}>
                        <Text size={10} marginRight={12} marginLeft={12}>{data.priority}</Text>
                    </CenteredFlexBox>
                </ContentBox>
            </VerticalFlexBox>

        </IssueCardCss>
    )
}


export const IssuesSection = () => {
    var { issueData, issueLoading, issueError } = GetIssuesList();
    const { todoData, todoLoading, todoError } = GetTodoIssuesList();
    const { ipData, ipLoading, ipError } = GetInProgressIssuesList();
    const { doneData, doneLoading, doneError } = GetDoneIssuesList();

    // if(todoError || ipError || doneError){
    //     return (
    //         <h1>Error</h1>
    //     )
    // }

    return (
        <FullWidthContentBox >
            <VerticalFlexBox>
                <SearchBarSection data={!issueLoading ? issueData : []} />
                <VerticalFlexBox fullWidth={true}>
                    <ContentBox marginLeft={30} marginTop={32}>
                        <Text size={28} fontWeight={600} color="#000000">Issues</Text>
                    </ContentBox>
                </VerticalFlexBox>
                <ContentBox fullWidth={true}>
                    <HorizontalGridBox>
                        {/* Todo Section */}
                        <DashboardCard2 marginRight={24} >
                            <VerticalFlexBox style={{ width: "100%" }}
                                onDragOver={(ev) => {
                                    ev.preventDefault();
                                    console.log(ev);
                                    var data = ev.dataTransfer.getData("text");
                                    console.log(data)
                                }}>
                                <Text color="black" size={20} marginLeft={24}>To Do ({!todoLoading ? todoData.length : "0"})</Text>
                                <hr style={{ width: "100%", border: "1px solid #eaeaea" }}></hr>
                                {!todoLoading ?
                                    todoData.map((issue, index) => {
                                        return (
                                            <IssueCard key={index} data={issue}/>
                                        )
                                    })
                                    :
                                    <></>}
                            </VerticalFlexBox>
                        </DashboardCard2>
                        <DashboardCard2 marginRight={24}>
                            <VerticalFlexBox style={{ width: "100%" }}
                                onDragOver={(ev) => {
                                    ev.preventDefault();
                                    var data = ev.dataTransfer.getData("text");
                                    console.log(data)
                                }}>
                                <Text color="black" size={20} marginLeft={24}>In Progress ({!ipLoading ? ipData.length : "0"})</Text>
                                <hr style={{ width: "100%", border: "1px solid #eaeaea" }}></hr>
                                {/* Here */}
                                {!ipLoading ?
                                    ipData.map((issue, index) => {
                                        return (
                                            <IssueCard key={index} data={issue} />
                                        )
                                    })
                                    :
                                    <></>}
                            </VerticalFlexBox>
                        </DashboardCard2>
                        <DashboardCard2 marginRight={24}>
                            <VerticalFlexBox style={{ width: "100%" }}
                                onDragOver={(ev) => {
                                    ev.preventDefault();
                                    var data = ev.dataTransfer.getData("text");
                                    console.log(data)
                                }}>
                                <Text color="black" size={20} marginLeft={24}>Done ({!doneLoading ? doneData.length : "0"})</Text>
                                <hr style={{ width: "100%", border: "1px solid #eaeaea" }}></hr>
                                {/* Here */}
                                {!doneLoading ?
                                    doneData.map((issue, index) => {
                                        return (
                                            <IssueCard key={index} data={issue} />
                                        )
                                    })
                                    :
                                    <></>}
                            </VerticalFlexBox>
                        </DashboardCard2>
                    </HorizontalGridBox>
                </ContentBox>
            </VerticalFlexBox>
        </FullWidthContentBox>
    )
}