import styled from "styled-components"

const A = styled.div`
    width: ${props => props.width ? props.width + "px" : "fit-content"};
    height: ${props => props.height ? props.height + "px" : "fit-content"};
    font-size: ${props => props.size ? props.size : "16"}px;
    color: ${props => props.color ? props.color : "#ffffff"};
    font-weight: ${props => props.fontWeight ? props.fontWeight : "100"};
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
    margin-right: ${props => props.marginRight ? props.marginRight : 0}px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
    margin-left: ${props => props.marginLeft ? props.marginLeft : 0}px;
    float: ${props => props.float ? props.float : "left"};
    font-family: "Arial";
    text-decoration: none;
`

const PoppinsText = styled(A)`
    font-family: 'Poppins';
`

const RotaText = styled(A)`
    font-family: 'Rota';
`

const NSText = styled(A)`
    font-family: 'Netflix Sans';
`


export const Text = ({typeface, children, ...props}) => {
    switch (typeface) {
        case "Poppins":
            return <PoppinsText {...props}>{children}</PoppinsText>
        case "Rota":
            return <RotaText {...props}>{children}</RotaText>
        case "Netflix-Sans":
            return <NSText {...props}>{children}</NSText>
        default:
            return <A {...props}>{children}</A>;
    }
}
