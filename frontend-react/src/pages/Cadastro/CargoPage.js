import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IMaskInput } from 'react-imask';


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

const MaskedInputStyled = styled(IMaskInput)`
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
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`;

function CargoForm() {
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [cargos, setCargos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [cargoSelecionadoId, setCargoSelecionadoId] = useState(null);

  const handleSalarioChange = (unmaskedValue) => {
    setSalario(unmaskedValue);
  };

  const buscarCargos = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cargos?nome=${filtroNome}`);
      setCargos(response.data);
    } catch (error) {
      console.error('Erro ao buscar cargos:', error);
    }
  };

  const handleSelecionarCargo = (cargo) => {
    setCargoSelecionadoId(cargo.id);
    setNome(cargo.nome);
    setSalario(cargo.salario.toString().replace('.', ','));
    setMensagem('');
  };

const handleCadastrar = async (e) => {
  e.preventDefault();
  const salarioDecimal = parseFloat(salario.replace(/\./g, '').replace(',', '.'));

  try {
    await axios.post('http://localhost:8000/api/cargos', {
      nome,
      salario: salarioDecimal,
    });

    setMensagem('Cargo cadastrado com sucesso!');
    setNome('');
    setSalario('');
    setCargoSelecionadoId(null);
    buscarCargos();
  } catch (error) {
    console.error('Erro ao cadastrar cargo:', error);
    setMensagem('Erro ao cadastrar cargo.');
  }
};

const handleAtualizar = async () => {
  if (!cargoSelecionadoId) return;

  const salarioDecimal = parseFloat(salario.replace(/\./g, '').replace(',', '.'));

  try {
    await axios.put(`http://localhost:8000/api/cargos/${cargoSelecionadoId}`, {
      nome,
      salario: salarioDecimal,
    });

    setMensagem('Cargo atualizado com sucesso!');
    setNome('');
    setSalario('');
    setCargoSelecionadoId(null);
    buscarCargos();
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    setMensagem('Erro ao atualizar cargo.');
  }
};

  const handleExcluir = async () => {
    if (!cargoSelecionadoId) return;

    try {
      await axios.delete(`http://localhost:8000/api/cargos/${cargoSelecionadoId}`);
      setMensagem('Cargo excluído com sucesso!');
      setNome('');
      setSalario('');
      setCargoSelecionadoId(null);
      buscarCargos();
    } catch (error) {
      console.error('Erro ao excluir cargo:', error);
      setMensagem('Erro ao excluir cargo.');
    }
  };

  return (
    <FormContainer>
      <Title>Cadastro de Cargos</Title>

      <Form onSubmit={(e) => { e.preventDefault(); buscarCargos(); }}>
        <Label>Pesquisar por Nome</Label>
        <Input
          type="text"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <Button type="submit">Pesquisar</Button>
      </Form>

      {cargos.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Salário</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((cargo) => (
              <tr
                key={cargo.id}
                onClick={() => handleSelecionarCargo(cargo)}
                style={{ cursor: 'pointer', backgroundColor: cargoSelecionadoId === cargo.id ? '#e0e0e0' : 'transparent' }}
              >
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{cargo.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>R$ {parseFloat(cargo.salario).toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Form onSubmit={handleCadastrar} style={{ marginTop: '30px' }}>
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
          <MaskedInputStyled
            mask={Number}
            thousandsSeparator='.'
            radix=','
            scale={2}
            padFractionalZeros={true}
            id="salario"
            value={salario}
            onAccept={(value) => handleSalarioChange(value)}
            required
          />
        </InputGroup>

        {mensagem && (
          <p style={{ textAlign: 'center', color: mensagem.includes('sucesso') ? 'green' : 'red' }}>
            {mensagem}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button type="submit" disabled={cargoSelecionadoId !== null}>Cadastrar</Button>
          <Button type="button" onClick={handleAtualizar} disabled={!cargoSelecionadoId}>Atualizar</Button>
          <Button type="button" onClick={handleExcluir} disabled={!cargoSelecionadoId} style={{ backgroundColor: '#dc3545' }}>
            Excluir
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default CargoForm;
