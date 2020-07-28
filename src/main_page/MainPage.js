import React, {Component} from 'react';
import '../scss/mainPage.scss'
import TasksGrid from "../tasks_grid/TasksGrid";
import {createTask, deleteTask, getTasks, updateTask} from "../RestApi";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: '',
      searchedTask: []
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
          .then((response) => {
            this.setState({tasks: response.data})
          }))
    };

    const onSubmitDeleteTask = (taskId) => {
      deleteTask(taskId).then(() => getTasks().then((response) => this.setState({tasks: response.data})))
    };
  const pressTaskName = (event) => {
    this.setState({searchedTask: event.target.value});
    console.log('Ищи элемент', this.state.searchedTask);
    event.preventDefault();
  };
    const searchTask = (title, tasks) => {
      console.log('Поиск');

    };
    return (
      <div className='wrap'>
        <form>
        <input onInput={pressTaskName}  onKeyUp={searchTask} type='text' className='searchTask' placeholder='Enter task name for search...'/>
        </form>
        <TasksGrid onSubmitDeleteTask={onSubmitDeleteTask} changeStatus={changeStatus} tasks={this.state.tasks}/>
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