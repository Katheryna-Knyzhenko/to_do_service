import React, {Component} from 'react';
import './MainPage.css';
import TasksGrid from "../tasks_grid/TasksGrid";
import {createTask, getTasks, updateTask} from "../RestApi";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            title: '',
        };
    }

    componentDidMount() {
        getTasks()
            .then((response) => {
                this.setState({tasks: response.data})
            })
    }

    render() {

        const handleChange = (event) => {
            this.setState({title: event.target.value})
        };
        const handleSubmit = (event) => {
            createTask(this.state.title).then(() => getTasks()
                .then((response) => {
                    this.setState({title: '', tasks: response.data})
                }));
            event.preventDefault();
        };

        const changeStatus = (taskId, taskStatus) => {
            updateTask(taskId, taskStatus)
                .then(() => getTasks()
                    .then((response) => {this.setState({tasks: response.data})
            }))
        };

        return (
            <div>
                <TasksGrid changeStatus={changeStatus} tasks={this.state.tasks}/>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type='text' value={this.state.title} onChange={handleChange}
                               placeholder='Enter task and press "Add task!" button'/>
                    </label>
                    <input type='submit' value='Add task!'/>
                </form>
            </div>

        )
    }
}

export default MainPage;