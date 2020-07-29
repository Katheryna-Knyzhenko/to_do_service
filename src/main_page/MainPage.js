import React, {Component} from 'react';
import '../scss/mainPage.scss'
import TasksGrid from "../tasks_grid/TasksGrid";
import {createTask, deleteTask, getTasks, updateTask} from "../RestApi";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filteredTasks: [],
      title: ''
    };
  }

  componentDidMount() {
    getTasks()
      .then((response) => {
        this.setState({tasks: response.data, filteredTasks: response.data})
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
          .then((response) => {
            this.setState({tasks: response.data})
          }))
    };

    const onSubmitDeleteTask = (taskId) => {
      deleteTask(taskId).then(() => getTasks().then((response) => this.setState({tasks: response.data})))
    };

    const searchTasks = (event) => {
      const filteredTasks = this.state.tasks.filter(task => task.title.includes(event.target.value));
      this.setState({filteredTasks: filteredTasks});
    };

    return (
      <div className='wrap'>
        <div className='mainContainer'>
        <form>
        <input className='inputSearchTask' onKeyUp={searchTasks} type='text'  placeholder='Enter task name for search...'/>
        </form>
        <TasksGrid onSubmitDeleteTask={onSubmitDeleteTask} changeStatus={changeStatus} tasks={this.state.filteredTasks}/>
        <form onSubmit={handleSubmit} className='formSubmit'>
          <label>
            <input className='inputAddTask' type='text' value={this.state.title} onChange={handleChange}
                   placeholder='Enter task and press "Add task!" button'/>
          </label>
          <input className='buttonAddTask' type='submit' value='Add task!'/>
        </form>
      </div>
      </div>

    )
  }
}

export default MainPage;