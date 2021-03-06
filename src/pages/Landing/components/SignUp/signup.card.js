import React, { useState } from 'react';
import { ContentBox, Card, Text } from '../../../../ui';
import styled from "styled-components"
import { useHistory } from 'react-router-dom';

const VerticalFlexBox = styled(ContentBox)`
width: 100%;
display: flex;
flex-direction: column;
`
const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`
const TextUnderLine = styled.div`
width: 92px;
height: 3px;
background: #4D60F6;
border-radius: 10px;
margin-top: 2px;

`

const AnimationPlaceHolder = styled(Text)`
position: absolute;
top: 14px;
left: 8px;
font-size: 16px;
color: #6e757c;
pointer-events: none;
transition: 0.5s;
`

const TextInput = styled.input`
width:100%;
height: 42px;
border: none;
border-bottom: solid 1px;
outline: none;


:valid ~ ${AnimationPlaceHolder} {
    transform: ${(props) =>
      props.value === "" ? "translate(0, 0)" : "translate(-10px, -24px)"};
    font-size: ${(props) => (props.value === "" ? "16px" : "12px")};
    color: ${(props) => (props.value === "" ? "#6e757c" : "#4D60F6")};
  }
  :focus ~ ${AnimationPlaceHolder} {
    transform: translate(-10px, -24px);
    font-size: 12px;
    color : 6e757c;
  }
  :focus{
    border-bottom: solid 2px #4D60F6;
  }
`

const Button = styled.button`
width: 100%;
height: 42px;
background: #4D60F6;
color: #ffffff;
font-family: "Arial";
font-weight: 600;
border: none;
cursor: pointer;
`


export const SignUpCard = () => {
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    return (
        <Card float="right" marginLeft={56}>
            <VerticalFlexBox>
                <VerticalFlexBox marginTop={8}>
                    <Text size={24} color="#000000" fontWeight={600}>Sign Up</Text>
                    <TextUnderLine />
                </VerticalFlexBox>
                <ContentBox marginTop={24} style={{position: "relative"}}>
                    <TextInput value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
                    <AnimationPlaceHolder color="#000000">Full Name</AnimationPlaceHolder>
                </ContentBox>
                <ContentBox marginTop={24} style={{position: "relative"}}>
                    <TextInput value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <AnimationPlaceHolder color="#000000">Email ID</AnimationPlaceHolder>
                </ContentBox>
                <ContentBox marginTop={24} style={{position: "relative"}}>
                    <TextInput value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <AnimationPlaceHolder color="#000000">Password</AnimationPlaceHolder>
                </ContentBox>
                <ContentBox marginTop={24} style={{position: "relative"}}>
                    <TextInput value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                    <AnimationPlaceHolder color="#000000">Confirm Password</AnimationPlaceHolder>
                </ContentBox>
                <ContentBox marginTop={24}>
                    <Button onClick={()=> {
                        history.push("/dashboard")
                    }}>Sign Up</Button>
                </ContentBox>
                <HorizontalFlexBox marginTop={24} marginBottom={8}>
                    <Text color="#000000" size={14}>Already Have An Account?</Text>
                    <Text style={{cursor: "pointer"}} href="/login" color="#4D60F6" size={14} fontWeight={600} marginLeft={4} onClick={() => {history.push("/login")}}>Login Here</Text>
                </HorizontalFlexBox>
            </VerticalFlexBox>
        </Card>
    )
}