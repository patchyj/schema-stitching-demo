import React from "react";
import Card from "./Card";

const Banner = ({ user, changeFocus, changeMinimise }) => {
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
				<div className="card-container">
					<Card
						title="Posts"
						subtitle=""
						text="Total posts"
						type="posts"
						changeFocus={changeFocus}
						changeMinimise={changeMinimise}
					/>
					<Card
						title="Projects"
						subtitle=""
						text="Total projects"
						type="projects"
						changeFocus={changeFocus}
						changeMinimise={changeMinimise}
					/>
					<Card
						title="Profile Summary"
						subtitle=""
						text=""
						type="profile"
						changeFocus={changeFocus}
						changeMinimise={changeMinimise}
					/>
				</div>
			</div>
		</div>
	);
};

export default Banner;
