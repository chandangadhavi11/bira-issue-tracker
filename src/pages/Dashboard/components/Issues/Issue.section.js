import React, { useState, useEffect } from 'react';
import { ContentBox, Text } from '../../../../ui';
import styled from "styled-components"
import { GetIssue, GetIssuesList, DeleteIssue, UpdateStatus, GetIssuesList2 } from '../../../../services';
import { EditModal } from "./modal/edit.modal"
import { DeleteConfirmationModal } from "./modal/deleteconfirm.modal"
import {SearchBarSection} from "../../../components"
import { Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDropdown = styled(Dropdown)`
margin-left: 10px;
#dropdown-basic{
    color: #fff;
    background-color: #EBEDF3;
    border-color: #EBEDF3;
    border-radius: 0;
    color: grey;
    : focus{
        box-shadow: 0 0 0 0.2rem rgb(72 180 97 / 0%);
    }
}
`

const FullWidthContentBox = styled(ContentBox)`
height: 100vh;
display: flex; 
flex-direction: column;
background: #ffffff;
overflow-x: hidden;
overflow-y: scroll;
`

const GridBox = styled(ContentBox)`
width: 100%;
display: grid;
grid-gap: 16px 150px;
grid-template-columns: auto auto auto;
`


const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
`
const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
`
const CenteredFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;
`

const EditLogo = styled.div`
width: 16px;
height: 16px;
background: black;
margin-left: 18px;
`

const SearchbarBox = styled(ContentBox)`
width: 100%;
height: 70px;
background: #ffffff;
box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.08);

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

export const IssueSection = ({ id }) => {
    const { issueData, issueLoading, issueError } = GetIssue(id);
    const { issueListData, issueListLoading, issueListError } = GetIssuesList2();
    const [editModalIsShown, setEditModalIsShown] = useState(false);
    const [deleteConfirmationModalIsShown, setDeleteConfirmationModalIsShown] = useState(false);
    const [status, setStatus] = useState();
    useEffect(() => {
        if (!issueLoading) {
            setStatus(issueData.status)
        }
    }, [issueLoading]);

    const changeStatus = async (statusValue) => {
        var formdata = new FormData();
        formdata.append("status", `${statusValue}`);
        var requestOptions = {
            method: 'PATCH',
            body: formdata,
            redirect: 'follow'
        };
        const changeStatusFetch = await fetch(`http://localhost:8000/api/v1/issues/${id}/`, requestOptions);
        const body = await changeStatusFetch.json();
        setStatus(body.status);
    }

    const deleteIssue = async () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        const deleteIssueFetch = await fetch(`http://localhost:8000/api/v1/issues/${id}/`, requestOptions);
    }

    if (issueLoading || issueListLoading) {
        return <h1>Loading</h1>
    }
    return (
        <FullWidthContentBox>
                <SearchBarSection data={issueListData} />
            <VerticalFlexBox marginLeft={48} marginTop={32} marginRight={64}>
                <ContentBox>
                    <Text size={26} color="#292D32" fontWeight={600}>{issueData.title}</Text>
                </ContentBox>
                <ContentBox marginTop={8} marginBottom={24}>
                    <Text size={20} color="#292D32">{issueData.description}</Text>
                </ContentBox>
                <ContentBox>
                    <HorizontalFlexBox>
                        <CenteredFlexBox componentHeight={40} bgc="#EBEDF3" direction="row"
                            onClick={() => setEditModalIsShown(true)}>
                            <EditLogo />
                            <Text size={18} marginLeft={8} marginRight={24} color="#292D32">Edit</Text>
                        </CenteredFlexBox>

                        <CenteredFlexBox componentHeight={40} bgc="#EBEDF3" marginLeft={12}>
                            <Text size={18} marginLeft={24} marginRight={24} color="#292D32">Assign</Text>
                        </CenteredFlexBox>

                        <CenteredFlexBox componentHeight={40} bgc="#EBEDF3" marginLeft={12}
                            onClick={() => setDeleteConfirmationModalIsShown(true)}>
                            <Text size={18} marginLeft={24} marginRight={24} color="#292D32">Delete</Text>
                        </CenteredFlexBox>
                        {/* Dropdown */}
                        <CustomDropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <Text size={18} marginLeft={12} color="#292D32">Status: </Text>
                                <Text size={18} marginLeft={4} marginRight={8} color="#4D60F6">
                                    {status === "TODO" ? "Todo" : ""}
                                    {status === "DOING" ? "In Progress " : ""}
                                    {status === "DONE" ? "Done" : ""}
                                </Text>
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item onClick={() => { changeStatus("TODO") }} active={`${status === "TODO" ? "Todo" : ""}`}>Todo</Dropdown.Item>
                                <Dropdown.Item onClick={() => { changeStatus("DOING") }} active={`${status === "DOING" ? "In Progress " : ""}`}>In Progress</Dropdown.Item>
                                <Dropdown.Item onClick={() => { changeStatus("DONE") }} active={`${status === "DONE" ? "Done" : ""}`}>Done</Dropdown.Item>
                            </Dropdown.Menu>
                        </CustomDropdown>
                    </HorizontalFlexBox>
                </ContentBox>
                <GridBox marginTop={30}>
                    <ContentBox display="block">
                        <Text size={16} color="#76797C">ID: </Text>
                        <Text size={16} fontWeight={600} color="#292D32" float="right">{issueData.short_id}</Text>
                    </ContentBox>

                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Issue Type: </Text>
                        <Text size={16} fontWeight={600} color="#292D32" float="right">Task</Text>
                    </ContentBox>

                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Priority: </Text>
                        <Text size={16} fontWeight={600} color={`
                            ${issueData.priority === "HIGH" ? "#D17B34" : ""}
                            ${issueData.priority === "MEDIUM" ? "#EDC54A" : ""}
                            ${issueData.priority === "LOW" ? "#9DA634" : ""}
                            ${issueData.priority === "VERY LOW" ? "#50942A" : ""}
                            ${issueData.priority === "SHOWSTOPPER" ? "#B83025" : ""}
                        }`} float="right">{issueData.priority}</Text>
                    </ContentBox>
                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Project: </Text>
                        <Text size={16} fontWeight={600} color="#292D32" float="right">Tringgo</Text>
                    </ContentBox>

                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Asignee: </Text>
                        <Text size={16} fontWeight={600} color="#292D32" float="right">Asignee</Text>
                    </ContentBox>

                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Due Date: </Text>
                        <Text size={16} fontWeight={600} color="#292D32" float="right">Jan 19, 2019</Text>
                    </ContentBox>
                    <ContentBox display="block">
                        <Text size={16} color="#76797C">Attachments: </Text>
                        <Text size={16} color="#4D60F6" float="right">error.pdf</Text>
                    </ContentBox>
                </GridBox>
            </VerticalFlexBox>

            <EditModal data={issueData} show={editModalIsShown} onHide={() => { setEditModalIsShown(false) }} />
            <DeleteConfirmationModal
                show={deleteConfirmationModalIsShown}
                onHide={() => { setDeleteConfirmationModalIsShown(false) }}
                onPressedDelete={()=> {
                    deleteIssue();
                    window.location.assign("/dashboard")
                    }} />

        </FullWidthContentBox>
    )
}