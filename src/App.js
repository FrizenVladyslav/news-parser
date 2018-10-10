import React, { Component } from 'react';
import Post from "./components/Post";
import { connect } from "react-redux";
import axios from 'axios';

import { Container, Header, Button, Item, Segment } from "semantic-ui-react";
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);
		
		this.fetchPosts = this.fetchPosts.bind(this);
		this.changeRegion = this.props.changeRegion;
	}

	componentWillMount(){
		this.fetchPosts();
	}

	fetchPosts() { //Компонент рендериться ещё не от рендерен
		axios.get('http://5b98ca63197ce5001429ee00.mockapi.io/posts')
			.then(({data}) => {
				const { setPosts } = this.props;
				setPosts(data);
			});
	}
	render() {
		const {post} = this.props;
		const {items} = post;
		console.log(items);
		
		return (
			<Container>
				<Header as='h2'>Регион {this.props.regions.region}</Header>
				<Button.Group basic>
					<Button onClick = {() =>  { this.changeRegion('Ukraine')} }>Ukrain</Button>
					<Button onClick = {() =>  { this.changeRegion('Dnepr')} }>Dnepr only</Button>
				</Button.Group>
				{
					!items.length ? (
						<Segment loading>
							<br/>
							<br/>
							<br/>
						</Segment>
					)
					 :
					 <Item.Group divided>{
						items.map(post => {
							return(
								<Post
									key = {post._id}
									title = {post.title}
									description = {post.text}
									image = {post.image}
									views = {post.views}
								/>
							);
						})
					 }
					</ Item.Group>
				}
			</Container>
		);
	}
}

const mapStateToProps = (props) => {
	return props;
}

const mapDispatchToProps = (dispatch) => ({
	setPosts: (data) => dispatch({
		type: 'SET_POSTS',
		payload: data
	}),
	changeRegion: (name) => dispatch({
		type: 'CHANGE_REGION',
		payload: name,
	}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
