import React from 'react';
import { Item, Label } from 'semantic-ui-react'

const Post = props => {
	const setText = (text) => {
		if(text.length >= 300){
			return text.substring(0, 300) + '...';
		}else return text;
	}
	return (
		<Item>
			<Item.Image src={props.image} />

			<Item.Content>
				<Item.Header as='a'>{props.title}</Item.Header>
				<Item.Description>{setText(props.description)}</Item.Description>
				<Item.Extra>
					<Label icon='eye' content={`Просмотров ${props.views}`}/>
				</Item.Extra>
			</Item.Content>
		</Item>
	);
}

export default Post;