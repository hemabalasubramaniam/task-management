import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { get, ref } from "firebase/database";


export const AuthContext  = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [dueDate, sortdueDate] = useState('Ascending');
    const [taskShow, setTaskShow] = useState([]);

    useEffect(() => {
        const userData = onAuthStateChanged(auth, initializeUser);
        return userData;
    }, [])

    const loginAction = (value) => {
        setLoggedIn(value);
    }

    const handleFilterAction = (value, type) => {
        if(type === "status"){
            setFilterStatus(value);
        }
        else if(type === 'priority'){
            setFilterPriority(value);
        }
        else{
            sortdueDate(value);
        }
    }

    const fetchTaskList = async () => {
        const tasksRef = ref(db, 'taskList');
    
        try {
            const snapshot = await get(tasksRef);
            if (snapshot.exists()) {
                const tasks = [];
                snapshot.forEach((snap) => {
                    tasks.push(snap.val());
                });
                setTaskList(tasks);
            } else {
                setTaskList([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    

    const taskShowList = () => {
        let filteredTasks = [...taskList];
    
        if (filterStatus !== 'All') {
            filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
        }
    
        if (filterPriority !== 'All') {
            filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
        }
    
        const sortedTasks = filteredTasks.sort((a, b) => {
            const dateA = new Date(a.duedate);
            const dateB = new Date(b.duedate);
    
            if (dueDate === 'Ascending') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    
        setTaskShow(sortedTasks);
    };
    
    const initializeUser = (user) => {
        if(user){
            setCurrentUser({...user});
        }
        else{
            setCurrentUser(null);
        }
        setLoading(false);
    }


    const value = {
        currentUser,
        loggedIn,
        loading,
        loginAction,
        fetchTaskList,
        taskList,
        filterStatus,
        filterPriority,
        handleFilterAction,
        taskShow,
        dueDate,
        taskShowList,
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
