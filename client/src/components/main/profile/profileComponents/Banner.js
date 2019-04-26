import React from 'react';
import Card from './Card';

const Banner = ({ user, changeFocus }) => {
	return (
		<div className="banner">
			<div className="left">
				<h1 className="text-white p-3 display-4">{`${user.firstName} ${
					user.lastName
				}`}</h1>
				<h4 className="text-white p-3">{user.email}</h4>
			</div>
			<div className="line" />
			<div className="right">
				<Card
					top={50}
					title="Posts"
					subtitle=""
					text="Total posts"
					type="posts"
					changeFocus={changeFocus}
				/>
				<Card
					top={150}
					title="Projects"
					subtitle=""
					text="Total projects"
					type="projects"
					changeFocus={changeFocus}
				/>
				<Card
					top={250}
					title="Profile Summary"
					subtitle=""
					text=""
					type="profile"
					changeFocus={changeFocus}
				/>
			</div>
		</div>
	);
};

export default Banner;
