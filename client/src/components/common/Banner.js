import React from "react";

const Banner = ({ user: { firstName, lastName, email, avatar, tagline } }) => {
	return (
		<div className="banner">
			<div className="left">
				<h1 className="text-white p-3 display-4">{`${firstName} ${lastName}`}</h1>
				<h4 className="text-white p-3">{email}</h4>
				<h5 className="text-white p-3">{tagline}</h5>
			</div>
			<div className="line" />
			<div className="right">
				<div className="avatar-container">
					<img src={avatar} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Banner;
