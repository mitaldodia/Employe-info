import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const client = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/users',
});

const App = () => {
	const [id, setID] = useState('');
	const [name, setName] = useState('');
	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [website, setWebsite] = useState('');
	const [posts, setPosts] = useState([]);

	// GET with Axios
	useEffect(() => {
		const fetchPost = async () => {
			try {
				let response = await client.get('?_limit=10');
				setPosts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPost();
	}, []);

	// DELETE with Axios
	const deletePost = async (id) => {
		try {
			await client.delete(`${id}`);
			setPosts(
				posts.filter((post) => {
					return post.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		addPosts(name, username, email, phone, website);
	};

	// POST with Axios
	const addPosts = async (name, username, email, phone, website) => {
		try {
			let response = await client.post('', {
				name: name,
				username: username,
				email: email,
				phone: phone,
				website: website
			});
			setPosts([response.data, ...posts]);
			setName('');
			setUserName('');
			setEmail('');
			setPhone('');
			setWebsite('');
		} catch (error) {
			console.log(error);
		}
	};

	// modal state 
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<nav className='title-name'>
				<h3>Employee Details</h3>
			</nav>
			<Container>
				<div className="app">
				
				{/* modal start here  */}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
						<Modal.Title>Employee Details Form</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<div className="add-post-container">

							<form className='row form-group' onSubmit={handleSubmit}>
								<div className='col-6 my-3'>
									<label>Enter First Name</label>

										<input
											type="text"
											className="form-control"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
								</div>
								<div className='col-6 my-3'>
									<label>Enter Last Name</label>
										<input
											type="text"
											className="form-control"
											value={username}
											onChange={(e) => setUserName(e.target.value)}
										/>
								</div>
								<div className='col-6 my-3'>
									<label>Enter Email Id</label>
										<input
											type="text"
											className="form-control"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
								</div>
								<div className='col-6 my-3'>
									<label>Enter Phone Number</label>
										<input
											type="text"
											className="form-control"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
								</div>
								<div className='col-12 my-3'>
									<label>Enter website</label>
										<input
											type="text"
											className="form-control"
											value={website}
											onChange={(e) => setWebsite(e.target.value)}
										/>
								</div>
								<button type="submit" onClick={handleClose}>Submite</button>
							</form>
						</div>
						</Modal.Body>
					</Modal>
				{/* modal end here  */}

				
				<div className="posts-container">
					<div className="add-new-emp">
						<Button variant="primary" onClick={handleShow}>
						<img src = "./add.png" className='add-btn' alt=""/>	Add new Employee
						</Button>
					</div>
					<div className='employe-header'>
						<Table striped bordered hover>
							<thead>
								<tr>
								<th>id</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Website</th>
								<th>Action</th>
								</tr>
							</thead>
							
						
					{posts.map((post) => {
						return (
							<tbody key={post.id}>
								<tr>
								<td>{post.id}</td>
								<td>{post.name}</td>
								<td>{post.username}</td>
								<td>{post.email}</td>
								<td>{post.phone}</td>
								<td>{post.website}</td>
								<td>
									<div className="button">
									<div className="delete-btn" onClick={() => deletePost(post.id)}>
											Delete
										</div>
									</div>
								</td>
								</tr>
							</tbody>
						);
					})}
					</Table>
					</div>
				</div>
				</div>
			</Container>
		</>
		
	);
};

export default App;
