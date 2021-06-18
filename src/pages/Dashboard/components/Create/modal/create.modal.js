import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components"
import { ContentBox, Text } from '../../../../../ui';

const StyledModal = styled(Modal)`
margin-left: 120px;
`

const FullWidthGridBox = styled(ContentBox)`
width: 100%;
display: grid;
grid-template-columns: auto auto;
padding: 24px;
margin-top: -16px;
`

const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
margin-top: 12px;
margin-bottom: 12px;
`

const TextInput = styled.input`
width:100%;
height: 56px;
border: solid 1px #E0E4E8;
outline: none;
padding-left: 16px;
font-style: ${props => props.value ? "normal" : "italic"};
`

const SelectOption = styled.select`
width:100%;
height: 56px;
margin-top: 4px;
border-color: #E0E4E8;
outline: none;
padding-left: 12px;

color: #54575B;
font-weight: 500;
`

export const CreateModal = (props) => {

    function randomString(length_) {

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
        if (typeof length_ !== "number") {
            length_ = Math.floor(Math.random() * chars.length_);
        }
        var str = '';
        for (var i = 0; i < length_; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }


    const [shortID, setShortID] = useState(randomString(10));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");
    const [priority, setPriority] = useState("MEDIUM");
    const [createdDate, setCreatedDate] = useState(new Date());

    const createIssue = async () => {
        var formdata = new FormData();
        formdata.append("short_id", `${shortID}`);
        formdata.append("description", `${description}`);
        formdata.append("priority", `${priority}`);
        formdata.append("status", `${status}`);
        formdata.append("title", `${title}`);
        formdata.append("created_at", `${createdDate}`);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };
        const editIssueFetch = await fetch(`http://localhost:8000/api/v1/issues/`, requestOptions);
        const body = await editIssueFetch.json();
        window.location.assign(`/issues/${body.id}`)
    }

    return (
        <StyledModal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Issue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FullWidthGridBox>
                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Project:</Text>
                        <SelectOption>
                            <option>Tringo</option>
                        </SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Issue Type:</Text>
                        <SelectOption>
                            <option>Task</option>
                        </SelectOption>
                    </VerticalFlexBox>

                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Title:</Text>
                        <TextInput placeholder="text..." value={title} onChange={(e) => { setTitle(e.target.value) }}></TextInput>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Description:</Text>
                        <TextInput placeholder="text..." value={description} onChange={(e) => { setDescription(e.target.value) }}></TextInput>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Priorty:</Text>
                        <SelectOption onChange={(e) => setPriority(e.target.value)}>
                            <option selected={priority === "HIGH"} value="HIGH">HIGH</option>
                            <option selected={priority === "MEDIUM"} value="MEDIUM">MEDIUM</option>
                            <option selected={priority === "LOW"} value="LOW">LOW</option>
                            <option selected={priority === "VERY LOW"} value="VERY LOW">VERY LOW</option>
                            <option selected={priority === "SHOWSTOPPER"} value="SHOWSTOPPER">SHOWSTOPPER</option>
                        </SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Assignee:</Text>
                        <SelectOption>
                            <option>Asignee</option>
                        </SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Attachments:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Due Date:</Text>
                        <SelectOption>
                            <option>21/21/21</option>
                        </SelectOption>
                    </VerticalFlexBox>
                </FullWidthGridBox>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={() => {
                    props.onHide()
                    createIssue();
                }}>Create</Button>
            </Modal.Footer>
        </StyledModal>
    );
}