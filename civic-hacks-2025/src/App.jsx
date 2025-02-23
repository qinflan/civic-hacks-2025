import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SpeciesFetcher from './components/SpeciesFetcher';
import AboutPage from './components/AboutPage';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SpeciesFetcher />} />
          <Route path="/about" element={<AboutPage/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
