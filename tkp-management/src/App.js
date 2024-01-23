import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import LoanManagementPage from './components/LoanManagementPage';
import RegisterPage from './components/RegisterPage';


// Import your components/pages
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AddBorrowerPage from './components/borrower/AddBorrowerPage';
import BorrowerProfile from './components/borrower/profil/BorrowerProfile';
import Compos from './components/MainContainer/Compos';
import MainAppContainer from './components/MainContainer/MainAppContainer';
import LoanPage from './components/loan/LoanPage';
import LoanProfil from './components/loan/profil/LoanProfil';
import BorrowersPage from './components/borrower/BorrowersPage';
// import LoanList from './components/LoanList';
// ... import other components

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-borrower" element={<AddBorrowerPage />} />
                    {/* <Route path="/loan-list" element={<LoanList />} /> */}
                    <Route path="/loan-list" element={<Compos />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Add more routes for other components/pages */}
                    <Route path="/" element={<MainAppContainer />}>
                        <Route path="/loans" element={<LoanPage />} />
                        <Route path="/loan-profil" element={<LoanProfil />} />
                        <Route path="/borrowers" element={<BorrowersPage />} />
                        <Route path="/add-borrowers" element={<AddBorrowerPage />} />
                        <Route path="/borrower-profil" element={<BorrowerProfile />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

