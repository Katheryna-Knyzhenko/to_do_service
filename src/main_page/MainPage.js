import React, {Component} from 'react';
import '../scss/mainPage.scss'
import TasksGrid from "../tasks_grid/TasksGrid";
import {createTask, deleteTask, getTasks, updateTask} from "../RestApi";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      searchedText: '',
      title: ''
    };
  }

  componentDidMount() {
    getTasks()
      .then((response) => {
        this.setState({tasks: response.data})
      })
  }

  render() {

    const changeTitle = (event) => {
      this.setState({title: event.target.value})
    };
    const createNewTask = (event) => {
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

    const changeSearchText = (event) => {
      const searchedText = event.target.value;
      this.setState({searchedText: searchedText});
    };

    return (
      <div className='wrap'>
        <div className='mainContainer'>
          <form>
            <input className='inputSearchTask' onKeyUp={changeSearchText} type='text'
                   placeholder='Enter task name for search...'/>
          </form>
          <TasksGrid onSubmitDeleteTask={onSubmitDeleteTask} changeStatus={changeStatus} tasks={this.state.tasks}
                     searchedText={this.state.searchedText}/>
          <form onSubmit={createNewTask} className='formSubmit'>
            <label>
              <input className='inputAddTask' type='text' value={this.state.title} onChange={changeTitle}
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