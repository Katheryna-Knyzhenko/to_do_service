import React, {Component} from 'react';
import './TasksGrid.css';

class TasksGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    return (
      <div>
        {this.props.tasks.map(task =>
          <div key={task.id}>
            <span
              className={task.done ? 'taskDoneStatus' : 'taskToDoStatus'}
              onClick={() => this.props.changeStatus(task.id, !task.done)}>{task.title}
            </span>
          </div>)}
      </div>

    )
  }
}

export default TasksGrid;