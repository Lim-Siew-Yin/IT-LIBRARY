import './App.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import axios from "axios";



function App() {

    const navigate = useNavigate()
    const [books, getBooks] = useState([])
    const [isbn, getISBN] = useState('')


    const [title, setTitle] = useState('')
    const [subtitle, setSubTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn13, setISBN] = useState('')
    const [year, setYear] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [bookimg, setImage] = useState('')

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                //alert('Please login')
                setTimeout(()=> {
                    navigate('/');
                   }, 1000);

            }else{
                getBookList();
            }
        }
        
        
    }, [])

    const getBookList = async () => {
        //event.preventDefault()
        try{
            const res = await axios.get(`https://api.itbook.store/1.0/new`)
            getBooks(res.data.books)
            
        }catch(err){
            console.log(err)
        }
    }

    


    const handleClick = (e) => {
        //event.preventDefault()
        
        getISBN(e.currentTarget.getAttribute("data-value"));

        axios.get(`https://api.itbook.store/1.0/books/${isbn}`).then( (res) =>{
            
            setTitle(res.data.title)
            setSubTitle(res.data.subtitle)
            setAuthor(res.data.authors)
            setPublisher(res.data.publisher)
            setISBN(res.data.isbn13)
            setYear(res.data.year)
            setDesc(res.data.desc)
            setPrice(res.data.price)
            setImage(res.data.image)
        })
        .catch(error=>{
            console.log(error)
        })

    }

    return(
        <Container>
            <Row>
                <Col>
                    <h3>TODAYS BOOK</h3>
                    <p>Please double click title to view book detail</p>
                    { books.map((book) =>{
                        return(
                            <div className='book'>
                                <ListGroup>
                                    <ListGroup.Item className='book-list-title' 
                                        data-value = {book.isbn13}
                                        onClick={handleClick} >
                                        {book.title}
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        )
                    })}
                </Col>

                <Col>
                <h3>BOOK DETAIL</h3>
                    <Form > 
                        <div className='img-container'>
                        <Image
                            src = {bookimg}
                            onChange={(e) => setImage(e.target.value)}
                            className='img-thumbnail' 
                            rounded/>

                        </div>

                        <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            value = {title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                            id='title' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Sub-Title</Form.Label>
                        <Form.Control 
                            value = {subtitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            type='text'
                            id='subtitle' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                            value = {author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type='text'
                            id='author' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control 
                            value = {publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            type='text'
                            id='publisher' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>ISBN13</Form.Label>
                        <Form.Control 
                            value = {isbn13}
                            onChange={(e) => setISBN(e.target.value)}
                            type='text'
                            id='isbn' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Published Year</Form.Label>
                        <Form.Control 
                            value = {year}
                            onChange={(e) => setYear(e.target.value)}
                            type='text'
                            id='year' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            value = {desc}
                            onChange={(e) => setDesc(e.target.value)}
                            type='text'
                            id='desc' />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            value = {price}
                            onChange={(e) => setPrice(e.target.value)}
                            type='text'
                            id='price' />
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    );
    
}

export default App;