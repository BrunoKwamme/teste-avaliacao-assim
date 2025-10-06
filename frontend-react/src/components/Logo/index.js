import { Link } from 'react-router-dom'
import logo from '../../images/logo-grupo-assim.png'
import styled from 'styled-components'

const LogoContainer = styled.div`
    display:flex;
    font-size: 30px;
`

const LogoImage = styled.img`
    margin-right: 10px;
`

function Logo() {
    return (
        <LogoContainer>
            <Link to={'/'}>
                <LogoImage
                    src={logo}
                    alt='logo'
                    className='logo-image'
                ></LogoImage>
            </Link>
        </LogoContainer>
    )
}

export default Logo