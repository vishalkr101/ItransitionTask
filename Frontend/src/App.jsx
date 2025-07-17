import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DrugInfo from './Pages/DrugsInfo';
import ErrorNotFound from './Pages/ErrorNotFound';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drugInfo" element={<DrugInfo />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
