import React from 'react';

import styled from "styled-components"
import { AutoComplete } from 'antd';
import { ContentBox } from '../../../ui';
import searchIcon from "../../../assets/icon_search.svg"
import sanal from "../../../assets/Sanal.svg"



const SearchbarBox = styled(ContentBox)`
width: 100%;
height: 70px;
background: #ffffff;
`
const SearchBarHorizontalFlexBox = styled(ContentBox)`
height: 100%;
display: flex;
flex-direction: row;
align-items: center;
`

const SearchLogo = styled.img`
width: 24px;
height: 24px;
padding: 3px;
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
background: url(${sanal});
background-size: cover;
background-position: center;
`
export const SearchBarSection = ({ props, data }) => {

    const options =
        data.map((issue) => {
            return { value: `ID: ${issue.id} | ${issue.title}` }
        })

    return (
        <SearchbarBox display="block">
            <SearchBarHorizontalFlexBox marginLeft={28}>
                <SearchLogo src={searchIcon}/>
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