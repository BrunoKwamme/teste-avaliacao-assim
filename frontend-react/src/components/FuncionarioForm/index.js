import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
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
`;

function FuncionarioForm() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    endereco: '',
    cpf: '',
    email: '',
    telefone: '',
    cargo: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Funcionário cadastrado:', formData);
    setFormData({
      nome: '',
      dataNascimento: '',
      endereco: '',
      cpf: '',
      email: '',
      telefone: '',
      cargo: ''
    });
  };

  return (
    <FormContainer>
      <Title>Cadastro de Funcionário</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nome">Nome</Label>
        <Input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
        <Input
          type="date"
          id="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
        />

        <Label htmlFor="endereco">Endereço Completo</Label>
        <Input
          type="text"
          id="endereco"
          value={formData.endereco}
          onChange={handleChange}
        />

        <Label htmlFor="cpf">CPF</Label>
        <Input
          type="text"
          id="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Label htmlFor="telefone">Telefone</Label>
        <Input
          type="tel"
          id="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />

        <Label htmlFor="cargo">Cargo</Label>
        <Input
          type="text"
          id="cargo"
          value={formData.cargo}
          onChange={handleChange}
          required
        />

        <Button type="submit">Cadastrar</Button>
      </Form>
    </FormContainer>
  );
}

export default FuncionarioForm;
