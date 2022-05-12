import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<ChatRoom />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
