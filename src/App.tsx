import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUpForm";
import { AuthProvider } from "./components/context/authContext";
import TaskTable from "./components/Taskmanager/TaskTable";
import Page from "./components/Taskmanager/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/taskmanager" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/taskmanager" element={<Page />} />
          <Route path="/taskmanager/task" element={<TaskTable />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
