import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "semantic-ui-react";
import './TaskList.css';
import { ref, remove } from "firebase/database";
import { db } from "../../firebase/Firebase";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskList = () => {
    const data = useContext(AuthContext);
    const {taskShow, fetchTaskList} = data;

    const handleDeleteTask = async (taskId) => {
        try {
            const taskRef = ref(db, `taskList/${taskId}`);
            await remove(taskRef);
            fetchTaskList();
            toast.error("Task Deleted Successfully !!!")
            
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleEdit = async () => {
    }

    return(
        <>
        <ToastContainer />
        <div className="taskContainer">
        <Header as="h2">Task List</Header>
        {
            (taskShow?.length === 0) ? <div className="noTask">No Tasks Found !!</div> : 
            taskShow?.map((task) => {
                return <div className="taskCard">
                    <Header as="h3">{task.title}</Header>
                    <div>{task.description}</div>
                    <div className="details">
                        <div>Due Date: {task.duedate}</div>
                        <div>Priority: {task.priority}</div>
                    </div>
                    <div className="details">
                        <div>Status: {task.status}</div>
                        <div className="actions">
                            <div className="edit" disabled onClick={() => handleEdit(task.taskId)}>Edit</div>
                            <div className="delete" onClick={() => handleDeleteTask(task.taskId)}>Delete</div>
                        </div>
                    </div>

                </div>
            })
        }
        </div>
        </>
    );
}

export default TaskList;