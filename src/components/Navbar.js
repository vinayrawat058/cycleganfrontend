import React, {useState} from "react";
import {NavbarContainer,NavbarLinkExtended, LeftContainer, NavbarExtendedContainer,NavbarInnerContainer, RightContainer, NavbarLinkContainer, NavbarLink, OpenLinksButton} from "../styles/Navbar.style";


function Navbar() {

    const [extendNavbar, setExtendNavbar] = useState(false);


    return (
    <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
        <LeftContainer>
            <NavbarLinkContainer>
              <NavbarLink to ="/">Dashboard</NavbarLink>
              <NavbarLink to ="/downloads">Downloads</NavbarLink>
              <OpenLinksButton on Click={() => {
                  setExtendNavbar((curr) => !curr);
              }}>
                  {extendNavbar  ?<>&#10005;</>: <>&#8801;</>}
                  </OpenLinksButton>
            </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
        </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
            <NavbarExtendedContainer>
              <NavbarLinkExtended to ="/">Dashboard</NavbarLinkExtended>
              <NavbarLinkExtended to ="/downloads">Downloads</NavbarLinkExtended>
            </NavbarExtendedContainer>
        )}
    </NavbarContainer>
    );
}

export default Navbar;
