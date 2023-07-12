import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { Button, Card, Col, Form, ListGroup, Row, Image, } from 'react-bootstrap';
import Rating from '../Components/Rating';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import Meta from '../Components/Meta';



const ProductScreen = () => {

    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [qty, setQty] = useState(1);
    // const [rating, setRating] = useState(0);
    // const [comment, setComment] = useState('');

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };


    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {isLoading ? <Loader /> : error ? <Message variant='danger'>
                {error?.data?.message || error.error}
            </Message>

                : (
                    <>
                        <Meta title={product.name} />
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {/* Qty Select */}
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}


        </>
    )
}

export default ProductScreen