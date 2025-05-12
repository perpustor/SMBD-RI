import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import AuthGuard from './components/common/AuthGuard';
import Dashboard from './pages/Dashboard';
import RecordsPage from './pages/RecordsPage';
import RecordDetailPage from './pages/RecordDetailPage';
import SearchPage from './pages/SearchPage';
import AuditPage from './pages/AuditPage';
import Login from './pages/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            <AuthGuard>
              <div className="min-h-screen bg-slate-900 text-white">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} />
                
                <div className="pt-16 lg:pl-64">
                  <main className="p-4 md:p-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/records" element={<RecordsPage />} />
                      <Route path="/records/:id" element={<RecordDetailPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/audit" element={<AuditPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;