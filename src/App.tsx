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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/taskmanager" element={<Page/>} />
          <Route path="/taskmanager/task" element={<TaskTable />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
