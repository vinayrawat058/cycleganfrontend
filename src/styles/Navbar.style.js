import styled from "styled-components"
import {Link} from "react-router-dom";

export const NavbarContainer = styled.nav  `
    width: 100%;
    height : ${(props) => (props.extendNavbar ? "100vh" : "80px")};
    background-color: grey;
    display: flex;
    flex-direction: column;
`;

export const LeftContainer = styled.div `
    flex : 70%;
    display: flex;
    align-items: center;
    padding-left: 5%;
    background-color: grey;
`;

export const RightContainer = styled.div `
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    background-color: black;
`;

export const NavbarInnerContainer = styled.div `
    width: 100%;
    height: 80px;
    display: flex;
`;

export const NavbarLinkContainer = styled.div`
    display: flex;
`;

export const NavbarLink = styled(Link)`
        color : white;
        font-size: large;
        font-family: Georgia, 'Times New Roman', Times, serif;
        text-decoration: double;
        margin: 10px;

        @media (max-width: 700px)
        {
            display: none;
        }

`;

export const NavbarLinkExtended = styled(Link)`
        color : white;
        font-size: large;
        font-family: Georgia, 'Times New Roman', Times, serif;
        text-decoration: double;
        margin: 10px;

`;



export const OpenLinksButton = styled.button `
        width : 70px;
        height : 50 px;
        background: none;
        color: white;
        font-size: 45px;
        cursor: pointer;

        @media (min-width: 700px)
        {
            display: none;
        }
`;

export const NavbarExtendedContainer = styled.div `

        display: flex;
        flex-direction: column;
        align-items: center;
    
    @media (min-width: 700px)
        {
            display: none;
        }
`;