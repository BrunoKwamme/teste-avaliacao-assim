import Header from './components/Header';
import Home from './pages/Home/HomePage'
import styled from 'styled-components';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import CargoPage from './pages/Cadastro/CargoPage';
import FuncionarioPage from './pages/Cadastro/FuncionarioPage';
import RelatorioPage from './pages/Relatorio/RelatorioPage'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(90deg, #002f52 35%, #326589);

`

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header/>
        <ContentWrapper>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cadastro-funcionario' element={<FuncionarioPage/>}/>
            <Route path='/cadastro-cargo' element={<CargoPage/>}/>
            <Route path="/relatorio-funcionarios" element={<RelatorioPage />} />
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
