import React from 'react';
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
font-style: italic;


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
                            <option>a</option>
                            <option>a</option>
                            <option>a</option>
                        </SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Issue Type:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>

                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Title:</Text>
                        <TextInput placeholder="text..."></TextInput>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Description:</Text>
                        <TextInput placeholder="text..."></TextInput>
                    </VerticalFlexBox>

                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Priorty:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Assignee:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>

                    <VerticalFlexBox marginRight={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Attachments:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>
                    <VerticalFlexBox marginLeft={12}>
                        <Text size={20} fontWeight={600} marginLeft={8} color="#54575B">Due Date:</Text>
                        <SelectOption></SelectOption>
                    </VerticalFlexBox>
                </FullWidthGridBox>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </StyledModal>
    );
}