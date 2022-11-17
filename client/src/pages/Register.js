import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setShow] = useState(false)  

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/register', {
    method: 'POST',  
    headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })

    const data = await response.json()
    if (data.status === 'ok') {
      setShow(true)

      setTimeout(()=> {
        navigate('/');
       }, 2000);
		}
  }

  const navigateLogin = () => {
    navigate('/')
  }
 
  return (
    <Container>
      <h1 className='title'>IT LIBRARY</h1>
    <Row>
      <Col>
            <h3>REGISTER</h3>
            <Form onSubmit={registerUser}> 
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                      value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      id='email' />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                      value = {name}
                      onChange={(e) => setName(e.target.value)}
                      type='text'
                      id='name' />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                      value = {password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      id='pass' />
                </Form.Group>
                
                    
                <Button type='submit' variant='primary'> REGISTER </Button>
                
                <Alert 
                    variant='success' 
                    show={alert}>
                      Register Successful!</Alert>
            </Form>
      </Col>
      
      <Col>
            <h3>LOGIN</h3>
            <Form> 
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                      type='email'
                      id='email' />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                      type='password'
                      id='pass' />
                </Form.Group>
                
                    
                <Button type='submit' variant='primary' onClick={navigateLogin}> LOGIN </Button>
            </Form>
      </Col>
    </Row>
    </Container>
  );
}

export default App;
