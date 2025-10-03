import HeaderOptions from "../HeaderOptions";

import Logo from "../Logo";
import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: #fff;
    display: flex;
    justify-content: center;
`

function Header()
{
    return (
        <HeaderContainer>
            <Logo/>
            <HeaderOptions/>
        </HeaderContainer>
    )
}

export default Header