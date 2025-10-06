import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  flex: 1;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #007bff;
  color: white;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const NoResults = styled.p`
  text-align: center;
  color: #777;
  margin-top: 20px;
`;


function FuncionarioRelatorioPage() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCargo, setFiltroCargo] = useState('');

  useEffect(() => {
    fetchRelatorio();
  }, []);

  const fetchRelatorio = async () => {
    try {
      const response = await api.get('/relatorio/funcionarios', {
        params: { nome: filtroNome, cargo: filtroCargo }
      });
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nome') setFiltroNome(value);
    if (name === 'cargo') setFiltroCargo(value);
  };

  const handleSubmitFiltro = (e) => {
    e.preventDefault();
    fetchRelatorio();
  };

  return (
    <Container>
      <Title>Relatório de Funcionários</Title>

      <Form onSubmit={handleSubmitFiltro}>
        <Input
          name="nome"
          value={filtroNome}
          onChange={handleFiltroChange}
          placeholder="Filtrar por nome"
        />
        <Input
          name="cargo"
          value={filtroCargo}
          onChange={handleFiltroChange}
          placeholder="Filtrar por cargo"
        />
        <Button type="submit">Filtrar</Button>
      </Form>

      {funcionarios.length > 0 ? (
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Cargo</Th>
            <Th>Salário</Th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(func => (
            <tr key={func.id}>
              <Td>{func.nome}</Td>
              <Td>{func.telefone}</Td>
              <Td>{func.cargo_nome}</Td>
              <Td>R$ {parseFloat(func.salario).toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      ) : (
        <NoResults>Nenhum funcionário encontrado.</NoResults>
      )}
    </Container>
  );
}

export default FuncionarioRelatorioPage;
