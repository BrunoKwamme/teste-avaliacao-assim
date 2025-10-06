import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IMaskInput } from 'react-imask';
import axios from 'axios';

const FormContainer = styled.div`
  max-width: 960px;
  margin: 20px auto; 
  padding: 20px; 
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 15px; 
  font-size: 18px; 
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px; 
  font-weight: 500;
  font-size: 14px; 
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 8px; 
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px; 
`;

const Button = styled.button`
  padding: 10px; 
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px; 

  &:hover {
    background-color: #0056b3;
  }
`;

const InlineGroup = styled.div`
  display: flex;
  gap: 8px; 
  margin-bottom: 8px; 
`;

const InlineInput = styled(Input)`
  flex-grow: 1;
  margin-bottom: 0;
`;

const NumberInput = styled(InlineInput)`
  max-width: 45%;
`;

const UFInput = styled(InlineInput)`
  flex-basis: 20%;
  max-width: 10%;
`;

const MaskedInput = styled(IMaskInput)`
  ${Input.componentStyle.rules}
`;

function FuncionarioForm() {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
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
    cargo_id: ''
  });

  const [funcionarios, setFuncionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [buscaNome, setBuscaNome] = useState('');
  const [buscaCpf, setBuscaCpf] = useState('');
  const [funcionarioSelecionadoId, setFuncionarioSelecionadoId] = useState(null);

  useEffect(() => {
    carregarCargos();
  }, []);

  const formatarDataParaBackend = (data) => {
    if (!data) return null;
    const partes = data.split('/');
    if (partes.length !== 3) return null;
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  const carregarCargos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cargos');
      setCargos(response.data);
    } catch (error) {
      console.error('Erro ao carregar cargos:', error);
    }
  };

  const buscarFuncionarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/funcionarios`, {
        params: {
          nome: buscaNome,
          cpf: buscaCpf
        }
      });
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleMaskedInputChange = (value, maskRef) => {
    setFormData((prev) => ({
      ...prev,
      [maskRef.el.input.id]: value,
    }));
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      data_nascimento: '',
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
      cargo_id: ''
    });
    setFuncionarioSelecionadoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        data_nascimento: formatarDataParaBackend(formData.dataNascimento),
      };

      await axios.post('http://localhost:8000/api/funcionarios', payload);
      setMensagem('Funcionário cadastrado com sucesso!');
      limparFormulario();
      buscarFuncionarios();
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      setMensagem('Erro ao cadastrar funcionário.');
    }
  };

  const handleAtualizar = async () => {
    if (!funcionarioSelecionadoId) return;

    try {
      const payload = {
        ...formData,
        data_nascimento: formatarDataParaBackend(formData.dataNascimento),
      };

      await axios.put(`http://localhost:8000/api/funcionarios/${funcionarioSelecionadoId}`, payload);
      setMensagem('Funcionário atualizado com sucesso!');
      limparFormulario();
      buscarFuncionarios();
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      setMensagem('Erro ao atualizar funcionário.');
    }
  };

  const handleExcluir = async () => {
    if (!funcionarioSelecionadoId) return;

    try {
      await axios.delete(`http://localhost:8000/api/funcionarios/${funcionarioSelecionadoId}`);
      setMensagem('Funcionário excluído com sucesso!');
      limparFormulario();
      buscarFuncionarios();
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      setMensagem('Erro ao excluir funcionário.');
    }
  };

  const selecionarFuncionario = (funcionario) => {
    setFuncionarioSelecionadoId(funcionario.id);
    setFormData({
      ...funcionario,
      cargo_id: funcionario.cargo?.id || '',
      dataNascimento: funcionario.dataNascimento ? (() => {
        const [ano, mes, dia] = funcionario.dataNascimento.split('-');
        return `${dia}/${mes}/${ano}`;
      })() : '',
    });
    setMensagem('');
  };

  return (
    <FormContainer>
      <Title>Cadastro de Funcionário</Title>

      <Form onSubmit={(e) => { e.preventDefault(); buscarFuncionarios(); }}>
        <InlineGroup>
          <Input
            type="text"
            placeholder="Buscar por nome"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <MaskedInput
            mask="000.000.000-00"
            placeholder="Buscar por CPF"
            id="cpfBusca"
            value={buscaCpf}
            onAccept={(value) => setBuscaCpf(value)}
          />
        </InlineGroup>
        <Button type="submit">Pesquisar</Button>
      </Form>

      {funcionarios.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>CPF</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr
                key={f.id}
                onClick={() => selecionarFuncionario(f)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: funcionarioSelecionadoId === f.id ? '#e0e0e0' : 'transparent'
                }}
              >
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{f.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{f.cpf}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{f.cargo?.nome || f.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nome">Nome</Label>
        <Input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <Label>Data de Nascimento</Label>
        <MaskedInput
          mask="00/00/0000"
          id="dataNascimento"
          value={formData.dataNascimento}
          onAccept={handleMaskedInputChange}
        />

        <Label htmlFor="logradouro">Logradouro</Label>
        <Input
          type="text"
          id="logradouro"
          placeholder="Rua, Av."
          value={formData.logradouro}
          onChange={handleChange}
        />

        <InlineGroup>
          <NumberInput
            type="text"
            id="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
          />
          <InlineInput
            type="text"
            id="complemento"
            placeholder="Complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </InlineGroup>

        <InlineGroup>
          <InlineInput
            type="text"
            id="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
          <InlineInput
            type="text"
            id="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
          <UFInput
            type="text"
            id="uf"
            placeholder="UF"
            value={formData.uf}
            maxLength="2"
            onChange={handleChange}
          />
        </InlineGroup>

        <Label htmlFor="cep">CEP</Label>
        <MaskedInput
          mask="00000-000"
          id="cep"
          placeholder="CEP"
          value={formData.cep}
          onAccept={handleMaskedInputChange}
        />

        <Label htmlFor="cpf">CPF</Label>
        <MaskedInput
          mask="000.000.000-00"
          id="cpf"
          value={formData.cpf}
          onAccept={handleMaskedInputChange}
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
        <MaskedInput
          mask={[{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]}
          id="telefone"
          value={formData.telefone}
          onAccept={handleMaskedInputChange}
        />

        <Label htmlFor="cargo_id">Cargo</Label>
        <select
          id="cargo_id"
          value={formData.cargo_id}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', marginBottom: '10px' }}
        >
          <option value="">Selecione um cargo</option>
          {cargos.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        {mensagem && <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</p>}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button type="submit" disabled={!!funcionarioSelecionadoId}>Cadastrar</Button>
          <Button type="button" onClick={handleAtualizar} disabled={!funcionarioSelecionadoId}>Atualizar</Button>
          <Button type="button" onClick={handleExcluir} disabled={!funcionarioSelecionadoId} style={{ backgroundColor: '#dc3545' }}>Excluir</Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default FuncionarioForm;
