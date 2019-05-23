import React from "react";
import PropTypes from "prop-types";
import DisplaySectionCard from "./DisplaySectionCard";

const DisplaySection = ({ info, readOnly, onChange }) => {
	const content = info.map((item, index) => {
		return (
			<div className="accordion" id="accordionExample" key={index}>
				<div className="card">
					<div className="card-header" id={`heading${index}`}>
						<h1 className="h1 mb-0">
							<button
								className="btn-link"
								type="button"
								data-toggle="collapse"
								aria-expanded="true"
								data-target={`#collapse${index}`}
								aria-controls={`collapse${index}`}
							>
								{item.school || item.title}
							</button>
						</h1>
					</div>
					<DisplaySectionCard
						index={index}
						disabled={readOnly}
						school={item.school}
						title={item.title}
						degree={item.degree}
						location={item.location}
						fieldofstudy={item.fieldofstudy}
						from={item.from}
						to={item.to}
						description={item.description}
						current={item.current}
					/>
				</div>
			</div>
		);
	});

	return (
		<div className="text-white">
			<div className="row">
				<div className="col-md-8 offset-md-2">{content}</div>
			</div>
		</div>
	);
};

DisplaySection.propTypes = {
	info: PropTypes.arrayOf(PropTypes.shape({})),
	readOnly: PropTypes.bool,
	onChange: PropTypes.func
};

export default DisplaySection;
