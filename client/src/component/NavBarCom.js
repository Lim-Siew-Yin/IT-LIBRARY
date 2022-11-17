import '../pages/App.css'
import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'

function App() {

    async function logoutUser(event){
        event.preventDefault()
    
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        alert("Logout Successful")
        window.location.href='/';
        
    } 

    async function deleteSearch(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/api/delete', {
            method: 'POST',
            headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify ({
              email: localStorage.getItem('email')
            })
          });
      
          const data = await response.json();
          
          if(data.status ==='ok'){
            //console.log("Search deleted")
            alert('Search deleted')
          }
          else {
            //console.log("Failed to delete search")
            alert('Delete failed')
          }
    
    
    }

    const email = localStorage.getItem('email')
    if(email){
        return (
            <NavBar sticky='top' bg='primary' variant='dark'>
                <Container>
                    <NavBar.Brand href='/book'>Todays Book</NavBar.Brand>
                    <NavBar.Brand href='/search'>Find Book</NavBar.Brand>
                    <Form onSubmit={logoutUser}>
                        <NavBar.Brand onClick={deleteSearch}>Delete Search Record</NavBar.Brand>
                        <NavBar.Brand><input type='submit' value="Logout" id='logout'/></NavBar.Brand>

                    </Form>
                </Container>
        </NavBar>
        
        )
    }
    
}

export default App