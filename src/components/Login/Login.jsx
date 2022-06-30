import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleActiveUserAction } from '../../store/actions/actions';

import styles from './Login.module.scss';

function Login(props) {
  const { toggleActiveUser } = props;
  const [nameState, setNameState] = useState('foo');
  const [passwordState, setPasswordState] = useState('');
  const [logMessage, setLogMessage] = useState('');

  const loginUser = (event) => {
    event.preventDefault();
    const user = {
      name: nameState,
      password: passwordState,
    };

    const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const isRegister = userDataStorage.some(({ name }) => name === user.name);
    if (!isRegister) {
      setLogMessage('User didn\'t found. Please, register.');
      return;
    }
    setLogMessage('Log in successfully');
    toggleActiveUser(user.name, true);
  };

  return (
    <div className={styles.login}>
      <form
        onSubmit={loginUser}
        className={styles.form}
      >
        <div className="form-outline mb-4">
          <input
            type="text"
            id="userName"
            onChange={(event) => setNameState(event.target.value)}
            className="form-control"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-label" htmlFor="userName">Username</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            onChange={(event) => setPasswordState(event.target.value)}
            className="form-control"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

        <div className="text-center">
          <p>
            Not a member?
            <Link to="/register">Register</Link>
          </p>
        </div>
        <div>{logMessage}</div>
      </form>
    </div>
  );
}

// <Link to="/catalog">
//           <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>
//         </Link>
Login.propTypes = {
  // activeUser: PropTypes.string.isRequired,
  toggleActiveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleActiveUser: toggleActiveUserAction,
};

const mapStateToProps = (state) => ({
  activeUser: state.appReducer.activeUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
