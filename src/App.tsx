import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import CustomToaster from './components/feedback/Toast';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <CustomToaster />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
