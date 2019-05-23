import React from "react";
import PropTypes from "prop-types";

const SkillSection = props => {
	const { info } = props;
	const content = info.map((item, index) => (
		<div className="row" key={index}>
			<div className="col-md-3 text-right">
				<label className="label">{item.name}</label>
			</div>
			<div className="col-md-6">
				<div className="progress my-2">
					<div
						className="progress-bar"
						style={{ width: item.level * 10 + "%" }}
						role="progressbar"
						aria-valuenow={item.level * 10}
						aria-valuemin="0"
						aria-valuemax="100"
					/>
				</div>
			</div>
			<div className="col-md-2">
				<label className="label">{item.level} / 10</label>
			</div>
		</div>
	));

	return (
		<div className="text-white">
			<div className="row">
				<div className="col-md-8 offset-md-2">{content}</div>
			</div>
		</div>
	);
};

SkillSection.propTypes = {
	info: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SkillSection;
