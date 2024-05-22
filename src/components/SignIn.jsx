import React, { useState } from 'react';
import { useSignInMutation } from '../features/api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getadmin, setadminWithToken } from '../features/slices/adminSlice';
import { useNavigate, Navigate } from 'react-router-dom';

function SignIn() {
  const [credentials, setCredentials] = useState({ phoneNumber: '', password: '' });
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const [loginUser, { isError, isLoading, isSuccess }] = useSignInMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.password || !credentials.phoneNumber) {
      setError('Fill all the fields');
    }

    try {
      const data = await loginUser(credentials).unwrap();
      console.log(data)

      if (data && data.statusCode === 200) {
        const admin = data.data.admin;
        const accessToken = data.data.accessToken;

        dispatch(setadminWithToken({ admin, accessToken }));
        window.location.href = '/'
      }
    } catch (error) {

      if (error.data) {
        setError(error.data.message)
      } else {
        setError('Something went wrong while logging')
      }
    }
  }

  return (
    <div>
      <h2 className="text-center bg-primary m-0 pt-4 text-light text-underline">Aniket Enterprises</h2>
      <div className="container-fluid d-flex justify-content-center align-item-center bg-primary form-cont">
        <div className="form-container bg-white border rounded-4 p-4 m-4 form-cont01">
          <h2 className="form-title text-center card-heading">
            <span className="about-text">Sign in </span>
          </h2>
          <form>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label input-headings ">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control input-custom"
                id="phoneNumber"
                placeholder="Enter your mobile number"
                value={credentials.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label input-headings">
                Password
              </label>
              <input
                type="password"
                className="form-control input-custom"
                id="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label input-headings">
                <input className="form-check-input" type="checkbox" aria-label="Checkbox for following text input" />
                &nbsp; Remember me
              </label>
            </div>
            <button onClick={handleSubmit} className="btn btn-custom btn-primary w-100">
              Submit
            </button>

          </form>
          <div className="text-center mt-3">
            {error && <span className='alert alert-danger p-1 mt-3'>{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
