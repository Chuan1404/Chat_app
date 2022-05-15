import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMember from './components/Modals/InviteMember';
import AppProvider from './context/AppProvider';
import AuthProvider from './context/AuthProvider';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route index element={<ChatRoom />} />
              <Route path='/login' element={<Login />} />
            </Routes>
            <AddRoomModal />
            <InviteMember />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
