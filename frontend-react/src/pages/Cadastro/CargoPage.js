import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios'

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

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CurrencyPrefix = styled.span`
  background-color: #eee;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  border-left: none;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

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
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/cargos', {
                nome,
                salario
            });
            console .log('Cargo cadastrado: ', response.data);
            setMensagem('Cargo cadastrado com sucesso!');
            setNome('');
            setSalario('');
        } catch (error) {
            console.log('Erro ao cadastrar cargo: ', error);
            setMensagem('Error ao cadastrar cargo. Verifique os dados.');
        }
    };
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

                <Label htmlFor="salario">Salário do Cargo</Label>
                <InputGroup>
                <CurrencyPrefix>R$</CurrencyPrefix>
                <Input
                    type="text"
                    id="salario"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    required
                />
                </InputGroup>

                <Button type="submit">Cadastrar</Button>
            </Form>
        </FormContainer>
    )
}

export default CargoForm