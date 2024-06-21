import React from "react";
import './TaskForm.css';
import { Button, Form, FormField, FormInput, FormSelect, FormTextArea, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/Firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { Formik } from "formik";
import * as Yup from 'yup';

const TaskForm  = () => {
    const navigate = useNavigate();
    const priorityOptions = [
        {key: 'l', value: 'Low', text: 'Low'},
        {key: 'm', value: 'Medium', text: 'Medium'},
        {key: 'h', value: 'High', text: 'High'},
    ];
    const statusOptions = [
        {key: 'p', value: 'Pending', text: 'Pending'},
        {key: 'c', value: 'Completed', text: 'Completed'},
    ];

    const initialValues = {
        title: '',
        description: '',
        duedate: '',
        priority:'',
        status: '',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required"),
        description: Yup.string().required("Description is Required"),
        duedate: Yup.date().required("Due Date is Required"),
        priority: Yup.string().required("Priority is Required"),
        status: Yup.string().required("Status is Required"),
    })

    const handleCancel = () => {
        navigate("/dashboard")
    }

    const handleTaskSave = (values) => {
        const { title, description, duedate, priority, status} = values;
        const db = getDatabase(app);
        const taskListRef = ref(db, 'taskList/');
        const newTaskRef = push(taskListRef);
        const taskId = newTaskRef.key;

        set(newTaskRef, {
            taskId: taskId,
            title: title,
            description: description,
            duedate:duedate,
            priority: priority,
            status: status
        }).then(() => {
            console.log("success")
            navigate("/dashboard");
        }).catch((error) => {
            console.error(error);
        })
    }
    return(
        <div className="taskFormWrapper">
            <Header as="h1">Add/Edit Task</Header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleTaskSave}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    touched,
                    errors,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormInput 
                            label="Title"
                            placeholder='Enter Title'
                            name="title" 
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={(touched.title && errors.title) && errors.title}
                        />
                        <FormField>
                            <label>Description</label>
                            <FormTextArea
                                placeholder='Enter Description' 
                                name="description" 
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="5"
                                error={(touched.description && errors.description) && errors.description}
                            />
                        </FormField>
                        <FormField>
                            <label>Due Date</label>
                            <FormInput
                                type="date" 
                                name="duedate"
                                value={values.duedate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={(touched.duedate && errors.duedate) && errors.duedate}
                            />
                        </FormField>
                        <FormField>
                            <label>Priority</label> 
                            <FormSelect
                                fluid
                                options={priorityOptions}
                                placeholder='Priority'
                                name="priority"
                                value={values.priority}
                                onChange={(e, data) => handleChange({
                                    target: {
                                        name: "priority",
                                        value: data.value,
                                    },
                                })}
                                onBlur={handleBlur}
                                error={(touched.priority && errors.priority) && errors.priority}
                            />
                        </FormField>
                        <FormField>
                            <label>Status</label>
                            <FormSelect
                                fluid
                                options={statusOptions}
                                placeholder='Status'
                                name="status"
                                value={values.status}
                                onChange={(e, data) => handleChange({
                                    target: {
                                        name: "status",
                                        value: data.value,
                                    },
                                })}
                                onBlur={handleBlur}
                                error={(touched.status && errors.status) && errors.status}
                            />
                        </FormField>
                        <div className="btnSection">
                            <Button type='button' onClick={() => handleCancel()}>Cancel</Button>
                            <Button primary type='submit'>Save</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default TaskForm;