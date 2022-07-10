import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import Header from "./components/Header"
import {NoteListPage} from './pages/NoteListPage'
import NotePage from "./components/NotePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    
    <BrowserRouter>
      <div className="container dark">
        <div className="app">
          <AuthProvider>
          <Header/>
          
          <Routes >

            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterUser />}/>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<HomePage />} exact/>
                <Route path="/note" element={<NoteListPage />} exact/>
                <Route path="/note/:id" element={<NotePage/>} exact/>
              </Route>
          </Routes>
          </AuthProvider>
        </div>
        
      </div>
  </BrowserRouter>
 
  
  );
}

export default App;
