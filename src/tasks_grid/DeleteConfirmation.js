import React, {Component} from 'react';
import '../scss/deletePopUp.scss'


class DeleteConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {deletedTaskId, onSubmitDeleteTask, onCancelDeleteTask} = this.props;

    return (
      <div className='popupDeleteOrNo'>
        <div>Are you sure you want to delete the task?</div>
        <button onClick={() => onSubmitDeleteTask(deletedTaskId)}>OK</button>
        <button onClick={onCancelDeleteTask}>Cancel</button>
      </div>

    )
  }
}

export default DeleteConfirmation;