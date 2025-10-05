import styled from "styled-components"
import {useState} from "react"
import { FaChevronDown} from "react-icons/fa"
import {Link} from 'react-router-dom'

const optionsText = ['CADASTRO', 'RELATORIO']

const Options = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
`

const Option = styled.li`
    position: relative;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    min-width: 120px;

    &:hover > ul {
        display: block;
    }
`

const Submenu = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #f0f0f0;
    list-style: none;
    padding: 10px 0;
    margin: 0;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
    min-width: 200px;
    z-index: 1000;

    li {
        padding: 8px 16px;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
            background-color: #ddd;
        }
        a {
            text-decoration: none;
            color: inherit;
            display: block;
            width: 100%;
            height: 100%;
        }
    }
`

function HeaderOptions(){
    return (
        <Options>
            {optionsText.map((text)=>(
                <Option key={text}>
                    <p>
                        <Link to="/relatorio-funcionarios" style={{ textDecoration: 'none', color: 'inherit' }}>{text}</Link>
                        {text === 'CADASTRO' && <FaChevronDown size={14}/>}
                    </p>
                    {text === 'CADASTRO' &&(
                        <Submenu>
                            <li><Link to="/cadastro-funcionario">Cadastro de Funcionário</Link></li>
                            <li><Link to="/cadastro-cargo">Cadastro de Cargo</Link></li>
                        </Submenu>
                    )}
                </Option>
            ))}
        </Options>
    )
}

export default HeaderOptions