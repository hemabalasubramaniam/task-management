import React, { useContext, useEffect } from "react";
import './Dashboard.css';
import { Button, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import FilterSection from "./FilterSection";
import { logout } from "../../firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import TaskList from "../taskList/TaskList";

const DashboardScreen = () => {

    const navigate = useNavigate();
    const data = useContext(AuthContext);
    const { loginAction, fetchTaskList, taskShowList, taskList, filterStatus, filterPriority, dueDate } = data;

    const handleLogout = () => {
      logout();
      loginAction(false);
      navigate("/");
    }

    useEffect(() => {
      const fetchData = async () => {
          await fetchTaskList();
        };
        fetchData();
  }, []);
  
  useEffect(() => {
      taskShowList();
  }, [taskList, filterStatus, filterPriority, dueDate]);
  
  

    const handleTaskAction = () => {
        navigate("/addEditTask");
    }

    return(
        <>
          <div className="navbar">
            <div className="navbarLeft">
              <Header as="h2">Task Board</Header>
            </div>
            <div className="navbarRight">
                <div>Dashboard</div>
                <Button negative onClick={() => handleLogout()}>Logout</Button>
            </div>
          </div>
          <div className="dashboardWrapper">
            <Button primary onClick={() => handleTaskAction()}>Add Task</Button>
            <FilterSection />
            <TaskList />
          </div>
        </>
    );
}

export default DashboardScreen;