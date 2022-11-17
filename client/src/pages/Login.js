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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertInvalid, setShowInvalid] = useState(false)  
  const [alertSuccess, setShowSuccess] = useState(false)  

  async function loginUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/', {
    method: 'POST',  
    headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    const data = await response.json()

    if(data.user){
      localStorage.setItem('token', data.user)
      localStorage.setItem('email', email)
      setShowSuccess(true)
        setTimeout(()=> {
          navigate('/book');
         }, 2000);
    }else{
        setShowInvalid(true)
        setTimeout(()=> {
          window.location.reload()
         }, 2000);
    }
    console.log(data)
  }

  const navigateReg = () => {
    navigate('/register')
  }

  return (

    <Container>
      <h1 className='title'>IT LIBRARY</h1>
      <Row>
        <Col>
              <h3>REGISTER</h3>
              <Form> 
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type='email'
                        id='email' />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text'
                        id='name' />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        id='pass' />
                  </Form.Group>
                  
                      
                  <Button type='submit' variant='primary' onClick={navigateReg}> REGISTER </Button>
              </Form>
        </Col>
        
        <Col>
              <h3>LOGIN</h3>
              <Form onSubmit={loginUser}> 
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        id='email'/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='text'
                        id='pass' />
                  </Form.Group>
                  
                      
                  <Button type='submit' variant='primary'> LOGIN </Button>

                  <Alert 
                    variant='success' 
                    show={alertSuccess}>
                      Login Successful!</Alert>

                  <Alert 
                    variant='danger' 
                    show={alertInvalid}>
                      Invalid Email or Password</Alert>
              </Form>
        </Col>
      </Row>
      </Container>

  );
}

export default App;
