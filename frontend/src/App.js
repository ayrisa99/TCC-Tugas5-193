import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./auth/authProvider";
import AxiosInterceptor from "./api/axiosInterceptor";

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptor />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/notes_data"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes_data/add"
            element={
              <PrivateRoute>
                <AddUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes_data/edit/:id"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
