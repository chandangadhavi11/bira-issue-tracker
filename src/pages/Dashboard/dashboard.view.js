import React from 'react';
import { ContentBox } from '../../ui';
import styled from "styled-components"
import { DashboardSection, SidebarSection, IssuesSection, IssueSection } from './components';

const FullWidthGridBox = styled(ContentBox)`
width: 100%;
display: grid;
grid-template-columns: 32.25ch auto;
@media (max-width: 1200px) {
    grid-template-columns: 14ch auto;
}
`

export const DashboardPage = ({match}) => {
    const id = match.params.id;
    var pathName = window.location.pathname;
    return (
        <FullWidthGridBox>
            <SidebarSection />
            {pathName === "/dashboard" ? <DashboardSection /> : <></>}
            {pathName === "/issues" ? <IssuesSection/> : <></>}
            {pathName === `/issues/${id}` ? <IssueSection id={id}/> : <></>}
        </FullWidthGridBox >
    )
}