import React from "react";
import PropTypes from 'prop-types';

const TaskModal = ({
  task,
  label,
  toggleEvent,
  auth,
  verification,
  onVerifyTaskCompletion
}) => {
  const hangleToggle = task => toggleEvent(task);
  const onVerifyTaskCompletionClick = task => onVerifyTaskCompletion(task);
  const isChecked = task.completed === true || verification ? true : false;

  return (
    <div
      className="modal fade"
      id={`task-${task.id}`}
      data-backdrop="static"
      aria-labelledby={`task-${task.id}Label`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <button
        id="hidePopUpBtn"
        type="button"
        className="close"
        data-dismiss="modal"
      />

      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="mx-3">{label}</label>
                </div>
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={isChecked}
                  onChange={() => hangleToggle(task)}
                />
              </div>
            </div>
            {auth === true && isChecked ? (
              <div>
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password Verification"
                  onChange={() => {}}
                />
                <small>
                  Please verify completion of this task by entering your
                  password
                </small>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onVerifyTaskCompletionClick(task)}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  task: PropTypes.object,
  label: PropTypes.string,
  toggleEvent: PropTypes.func,
  auth: PropTypes.bool,
  verification: PropTypes.bool,
  onVerifyTaskCompletion: PropTypes.func
}

export default TaskModal;
