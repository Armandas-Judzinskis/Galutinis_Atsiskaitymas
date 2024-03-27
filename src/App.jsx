import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Questions from './components/pages/Questions';
import Header from './components/UI/Header';
import AddNewQuestion from './components/pages/AddNewQuestion';
import OneQuestionPage from './components/pages/OneQuestionPage';
import Footer from './components/UI/Footer';
const App = () => {

  const { loggedInUser } = useContext(UsersContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/questions'>
            <Route index element={<Questions />}/>
            <Route path='allQuestions' element={<Questions />}/>
            <Route path='addNew' element={
              loggedInUser ? <AddNewQuestion /> : <Navigate to='/user/login' />
            }/>
            <Route path=':id' element={<OneQuestionPage />}/>
          </Route>
          <Route path='/user'>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;