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
				<div className="avatar-container" style={{ background: `url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80)`}}>
					{/* <img src={avatar} alt="" /> */}
				</div>
			</div>
		</div>
	);
};

export default Banner;
