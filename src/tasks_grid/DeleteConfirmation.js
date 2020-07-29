import React, {Component} from 'react';
import '../scss/deletePopUp.scss';
import $ from 'jquery';


class DeleteConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {deletedTaskId, onSubmitDeleteTask, onCancelDeleteTask} = this.props;

    $(document).ready(function() {
      const popup = document.querySelector('.popupDeleteOrNo');

    document.onclick = function(e){
      if (e.target.className !== 'popupDeleteOrNo') {
        popup.style.display = 'none';
      }
    }
  });
    return (
      <div className='popupDeleteOrNo'>
        <div className='askAboutDeleteTask'>Are you sure you want to delete the task?</div>
        <div className='buttonsDelete'>
        <button className='deleteButtonOk' onClick={() => onSubmitDeleteTask(deletedTaskId)}>OK</button>
        <button className='deleteButtonCancel' onClick={onCancelDeleteTask}>Cancel</button>
      </div>
      </div>

    )
  }
}

export default DeleteConfirmation;