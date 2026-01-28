import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import LoadingProgress from './components/LoadingProgress';

const App: React.FC = () => {
  return (
    <Router>
      <LoadingProgress />
      <AppRoutes />
    </Router>
  );
};

export default App;
