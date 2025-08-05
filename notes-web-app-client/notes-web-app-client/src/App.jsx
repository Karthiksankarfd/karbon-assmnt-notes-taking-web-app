import {Slide, ToastContainer } from 'react-toastify';
import './App.css'
import AuthContextProvider from './contex/AuthContext';
import UserContextProvider from './contex/UserContext';
import AppRoutes from './routes/AppRoutes';
import ToastContainerCom from './components/UI/ToastContainerCom';
import EditContextProvider from './contex/EditContext';


function App() {
  return (
    <EditContextProvider>
        <AuthContextProvider>
            <UserContextProvider>
                  <ToastContainerCom/>
                  <AppRoutes/>
            </UserContextProvider>
        </AuthContextProvider>
    </EditContextProvider>

  )
}

export default App
