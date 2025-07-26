import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestProvider } from './context/TestContext';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <TestProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result/:id" element={<ResultPage />} />
          </Routes>
        </div>
      </Router>
    </TestProvider>
  );
}

export default App;
