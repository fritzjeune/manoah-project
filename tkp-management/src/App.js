
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import LoanManagementPage from './components/LoanManagementPage';
import RegisterPage from './components/RegisterPage';


// Import your components/pages
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AddBorrowerPage from './components/borrower/AddBorrowerPage';
import BorrowerProfile from './components/borrower/BorrowerProfile';
// import LoanList from './components/LoanList';
// ... import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-borrower" element={<AddBorrowerPage />} />
        <Route path="/borrower-profil" element={<BorrowerProfile />} />
        {/* <Route path="/loan-list" element={<LoanList />} /> */}
        {/* Add more routes for other components/pages */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

