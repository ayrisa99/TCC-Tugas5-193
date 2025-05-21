import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./auth/authProvider";
import AxiosInterceptor from "./api/axiosInterceptor";


function App() {
  return (
    <AuthProvider>
      <AxiosInterceptor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
