import React, {Component} from 'react';
import {updateTask} from "../RestApi";

class TasksGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div>
                {this.props.tasks.map(task => <div key={task.id}><span onClick={() => updateTask(task.id, !task.done)}>{task.title}</span></div>)}
            </div>

        )
    }
}

export default TasksGrid;