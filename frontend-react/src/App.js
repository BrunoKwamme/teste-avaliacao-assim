import Header from './components/Header';
import Home from './pages/Home/home'
import styled from 'styled-components';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import CadastroCargo from './components/CargoForm';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589);

`

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cadastro-cargo' element={<CadastroCargo/>}/>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
