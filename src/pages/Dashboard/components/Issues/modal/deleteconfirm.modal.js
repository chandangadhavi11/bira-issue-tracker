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

export const DeleteConfirmationModal = ({ onPressedDelete, ...props}) => {
    return (
        <StyledModal
            {...props}
            size="m"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Issue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to delete this issue?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={onPressedDelete}>Delete</Button>
            </Modal.Footer>
        </StyledModal>
    );
}