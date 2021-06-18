import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components"
import { ContentBox, Text } from '../../../../../ui';
import { EditConfirmationModal } from './editconfirm.modal';

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
font-style: italic;
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

export const EditModal = (props) => {
    const [title, setTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.data.description);
    const [priority, setPriority] = useState(props.data.priority);
    const [status, setStatus] = useState(props.data.status);
    const [shortID, setShortID] = useState(props.data.short_id);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [editConfirmationModalIsShown, setEditConfirmationModalIsShown] = useState(false);

    useEffect(() => {
        setSubmitButtonDisabled(true);
    }, [title, description, priority]);

    const editIssue = async (id) => {
        var formdata = new FormData();
        formdata.append("short_id", `${shortID}`);
        formdata.append("description", `${description}`);
        formdata.append("priority", `${priority}`);
        formdata.append("status", `${status}`);
        formdata.append("title", `${title}`);

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
        };
        const editIssueFetch = await fetch(`http://localhost:8000/api/v1/issues/${id}/`, requestOptions);
        const body = await editIssueFetch.json();
        window.location.assign(`/issues/${id}`)
    }


    return (
        <ContentBox>
            <StyledModal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Issue
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
                    <Button disabled={!submitButtonDisabled} onClick={() => {
                        setEditConfirmationModalIsShown(true);
                        props.onHide()
                    }}>Submit</Button>
                </Modal.Footer>
            </StyledModal>

            <EditConfirmationModal
                show={editConfirmationModalIsShown}
                onHide={() => { setEditConfirmationModalIsShown(false) }}
                onPressedEdit={() => {
                    editIssue(props.data.id);
                    console.log("Edited");
                }} />

        </ContentBox>

    );
}