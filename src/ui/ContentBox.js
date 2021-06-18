import styled from "styled-components"

const Box = styled.div`
    width: ${props => props.componentWidth ? props.componentWidth + "px" : "auto"};
    height: ${props => props.componentHeight ? props.componentHeight + "px" : "fit-content"};
    display: ${props => props.display ? props.display : "flex"};
    flex-direction: ${props => props.direction ? props.direction + "px" : "none"};
    float: ${props => props.float ? props.float : "left"};
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
    margin-right: ${props => props.marginRight ? props.marginRight : 0}px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
    margin-left: ${props => props.marginLeft ? props.marginLeft : 0}px;
    background-color: ${props => props.bgc ? props.bgc : "none"};
    border-radius: ${props => props.borderRadius ? props.borderRadius : "0"}px;

`

const FullWidthContentBox = styled(Box)`
    width: 100%;
`

export const ContentBox = ({fullWidth, children, ...props}) => {
    if (fullWidth) {
        return <FullWidthContentBox {...props}>{children}</FullWidthContentBox>
    } else {
        return <Box {...props}>{children}</Box>
    }
}

