import React, { useState } from 'react';
import styled from 'styled-components';

// Manter os estilos existentes
const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto; /* Reduzida a margem externa */
  padding: 18px; /* Reduzido o padding interno */
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 15px; /* Reduzida a margem inferior do título */
  font-size: 18px; /* Ligeiramente menor */
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px; /* Reduzida a margem inferior do label */
  font-weight: 500;
  font-size: 14px; /* Ligeiramente menor */
`;

const Input = styled.input`
  padding: 8px; /* Reduzido o padding interno */
  margin-bottom: 8px; /* Reduzido ainda mais o espaçamento entre inputs */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px; /* Ligeiramente menor */
`;

const Button = styled.button`
  padding: 10px; /* Reduzido o padding do botão */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px; /* Ligeiramente menor */
  cursor: pointer;
  margin-top: 10px; /* Ajuste na margem superior */

  &:hover {
    background-color: #0056b3;
  }
`;

// Novo componente para agrupar inputs na mesma linha
const InlineGroup = styled.div`
  display: flex;
  gap: 8px; /* Reduzido o espaçamento entre elementos inline */
  margin-bottom: 8px; /* Reduzido o espaçamento */
`;

// Novo componente para inputs menores
const InlineInput = styled(Input)`
  flex-grow: 1;
  margin-bottom: 0;
`;

// Componente para inputs menores com largura fixa
const CEPInput = styled(InlineInput)`
  flex-basis: 55%; /* Ajustado para dar mais espaço ao CEP */
  max-width: 55%;
`;

const NumberInput = styled(InlineInput)`
  flex-basis: 45%; /* Ajustado */
  max-width: 45%;
`;

const UFInput = styled(InlineInput)`
  flex-basis: 25%;
  max-width: 25%;
`;


function FuncionarioForm() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
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
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
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
        {/* Dados Pessoais */}
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
        
        {/* Endereço Detalhado */}
        <Label htmlFor="cep">Endereço</Label>
        <InlineGroup>
          <CEPInput
            type="text"
            id="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleChange}
            required
          />
          <NumberInput
            type="text"
            id="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </InlineGroup>

        <Input
          type="text"
          id="logradouro"
          placeholder="Logradouro (Rua, Av.)"
          value={formData.logradouro}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          id="complemento"
          placeholder="Complemento (Apto, Bloco)"
          value={formData.complemento}
          onChange={handleChange}
        />

        <Input
          type="text"
          id="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleChange}
          required
        />

        <InlineGroup>
          <InlineInput
            type="text"
            id="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <UFInput
            type="text"
            id="uf"
            placeholder="UF"
            value={formData.uf}
            onChange={handleChange}
            maxLength="2"
            required
          />
        </InlineGroup>
        
        {/* Outros Dados */}
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