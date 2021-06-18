import React, { useState } from 'react';
import { ContentBox, Text } from '../../../../ui';
import { useHistory } from "react-router-dom";
import {CreateModal} from "../Create/modal/create.modal"
import styled from "styled-components"

const SidebarFlexBox = styled(ContentBox)`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background: #1D2235;
z-index: 100;
`
const VerticalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: column;
`
const HorizontalFlexBox = styled(ContentBox)`
display: flex;
flex-direction: row;
`

const SidebarLinks = styled(HorizontalFlexBox)`
margin-top: 16px;
margin-right: 30px;
margin-left: 22px;
padding-top: 13px;
padding-bottom: 13px;
padding-right: 20px;
padding-left: 20px;
background: ${props => props.linkSelected ? "#ffffff" : "#000000"};
align-items: center;
cursor: pointer;
border-radius: 4px;
`

const SidebarLogoCSS = styled.div`
width: 100%;
height: 70px;
background: #ffffff;
border-right: 1px solid #E9EAEA;
border-bottom: 1px solid #E9EAEA;
box-sizing: border-box;
`

const Logo = styled.div`
width: 48px;
height: 48px;
background: black;
`

const SidebarElementLogo = styled.img`
width: 24px;
height: 24px;
background: black;
`

const SidebarLogo = () => {
    return (
        <SidebarLogoCSS>
            <HorizontalFlexBox marginTop={10} marginLeft={20} style={{ width: "100%", height: "100%" }}>
                <Logo />
                <Text size={26} marginLeft={8} marginTop={10} fontWeight={600} color="#000000">BIRA</Text>
            </HorizontalFlexBox>
        </SidebarLogoCSS>
    )
}


export const SidebarSection = () => {
    const linkData = [
        {
            linkName: "Dashboard",
            link: "dashboard"
        },
        {
            linkName: "Issues",
            link: "issues"
        },
        {
            linkName: "Create",
            link: "create"
        },
    ]
    const [linkFocusNumber, setLinkFocusNumber] = useState(window.location.pathname);
    const [createModal, setCreateModal] = useState(false);
    let history = useHistory();
    return (
        <ContentBox>
            <SidebarFlexBox>
                <SidebarLogo></SidebarLogo>
                <VerticalFlexBox marginTop={10}>
                    {linkData.map((link, index) => {
                        var focus = (`/${link.link}` === linkFocusNumber);
                        return (
                            <SidebarLinks  key={index} style={{background: `${focus ? "#4D60F6" : "#00000000"}`}} onClick={() => {
                                setLinkFocusNumber(`/${link.link}`)
                                if(link.link === "create"){
                                    setCreateModal(true)
                                } else {
                                    history.push(`/${link.link}`)
                                }
                                }}>
                                <SidebarElementLogo marginLeft={16}></SidebarElementLogo>
                                <Text size={16} color={`${focus ? "#ffffff" : "#7886B2"}`} marginLeft={24}>{link.linkName}</Text>
                            </SidebarLinks>
                        )
                    })}
                </VerticalFlexBox>
            </SidebarFlexBox>
            <CreateModal show={createModal} onHide={()=> {
                setCreateModal(false)
                setLinkFocusNumber(`${window.location.pathname}`)
                history.push(`${window.location.pathname}`)
                }}/>
        </ContentBox>
    )
}