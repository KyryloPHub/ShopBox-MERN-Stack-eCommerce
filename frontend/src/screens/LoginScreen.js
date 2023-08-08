import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Card className='box p-5'>
        <h2 class='sub-heading mb-5'>Login</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          {/* old code */}
          {/* <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group> */}

          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-envelope'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-lock'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <Button type='submit' variant='primary' block>
            Login
          </Button>
        </Form>

        <div className='mt-5'>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </div>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
