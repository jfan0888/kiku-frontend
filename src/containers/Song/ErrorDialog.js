import React from 'react';

const ErrorDialog = ({ text, closeHandler }) => (
  <div className="error-dialog-container">
    <a className="close-button" onClick={closeHandler} >x</a>
    <div className="content">
      {text}
    </div>
  </div>
);

export default ErrorDialog;