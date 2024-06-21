import React from "react";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import DashboardScreen from "./components/dashboard/DashboardScreen";
import TaskForm from "./components/addEditTask/TaskForm";
import Register from "./components/register/Register";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
            </Route>
            <Route path="/addEditTask" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
    );
};

export default App;
