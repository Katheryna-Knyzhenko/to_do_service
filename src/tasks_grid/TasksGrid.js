import React, {Component} from 'react';
import '../scss/tasksGrid.scss';
import DeleteConfirmation from "./DeleteConfirmation";


class TasksGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedTaskId: null,
    };
  }


  render() {
    const {tasks, changeStatus, onSubmitDeleteTask, searchedText} = this.props;

    const onCancelDeleteTask = () => {
      this.setState({deletedTaskId: null})
    };

    return (
      <div className='taskGrid'>
        {tasks
          .filter(task => task.title.includes(searchedText))
          .map(task =>
            <div key={task.id} className='flexDiv'>
            <span
              className={task.done ? 'taskTitle taskDoneStatus' : 'taskTitle taskToDoStatus'}
              onClick={() => changeStatus(task.id, !task.done)}>{task.title}
            </span>

              {task.done &&
              <button className='deleteTask' onClick={() => this.setState({deletedTaskId: task.id})}>Delete</button>}

              {this.state.deletedTaskId === task.id &&
              <DeleteConfirmation deletedTaskId={this.state.deletedTaskId} onSubmitDeleteTask={onSubmitDeleteTask}
                                  onCancelDeleteTask={onCancelDeleteTask}/>}
            </div>)}
      </div>

    )
  }
}

export default TasksGrid;