import Header from './components/Header';
import Home from './pages/Home/HomePage'
import styled from 'styled-components';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import CargoPage from './pages/Cadastro/CargoPage';
import FuncionarioPage from './pages/Cadastro/FuncionarioPage';
import RelatorioPage from './pages/Relatorio/RelatorioPage'
import axios from 'axios'
import { useEffect } from 'react';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589);

`

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/api/ping')
      .then(response => {
        console.log('Conectado com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao conectar com a API:', error);
      });
  }, []);
  return (
    <BrowserRouter>
      <AppContainer>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cadastro-funcionario' element={<FuncionarioPage/>}/>
          <Route path='/cadastro-cargo' element={<CargoPage/>}/>
          <Route path="/relatorio-funcionarios" element={<RelatorioPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
