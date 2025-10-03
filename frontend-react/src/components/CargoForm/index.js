import React, {useState} from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 500;
`

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
`

const Button = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`

function CargoForm()
{
    const [nome, setNome] = useState('')
    const [salario, setSalario] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('cargo cadastrado', {nome, salario})
        setNome('')
        setSalario('')
    }
    return (
        <FormContainer>
            <Title>Cadastro de Cargos</Title>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor='nome'>Nome do Cargo</Label>
                <Input
                    type='text'
                    id='nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <Label htmlFor='salario'>Salário do Cargo</Label>
                <Input
                    type='text'
                    id='salario'
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                />

                <Button type="submit">Cadastrar</Button>
            </Form>
        </FormContainer>
    )
}

export default CargoForm