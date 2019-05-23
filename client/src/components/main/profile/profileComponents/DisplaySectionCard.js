import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import TextFieldInput from "../../../common/TextFieldInput";
import TextAreaFieldInput from "../../../common/TextAreaFieldInput";
import DateFieldInput from "../../../common/DateFieldInput";

const momentum = date => {
	const checked = new Date(date);
	return moment(checked).format("YYYY-MM-DD");
};

class DisplaySectionCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			school: "",
			title: "",
			degree: "",
			location: "",
			fieldofstudy: "",
			from: "",
			to: "",
			description: "",
			current: false
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const {
			index,
			disabled,
			school,
			title,
			degree,
			location,
			fieldofstudy,
			from,
			to,
			description,
			current
		} = this.props;

		this.setState({
			index,
			disabled,
			school,
			title,
			degree,
			location,
			fieldofstudy,
			from,
			to,
			description,
			current
		});
	}

	render() {
		const {
			index,
			disabled,
			school,
			title,
			degree,
			location,
			fieldofstudy,
			from,
			to,
			description,
			current
		} = this.state;

		return (
			<div
				id={`collapse${index}`}
				className={`collapse`}
				aria-labelledby={`heading${index}`}
				data-parent="#accordionExample"
			>
				<div className="card-body">
					<div className="row">
						<div className="col-8">
							<div className="row">
								<TextFieldInput
									onchange={this.onChange}
									value={school || title}
									name={"school" || "title"}
									disabled={disabled}
									cols={12}
								/>
							</div>
							<div className="row">
								<TextFieldInput
									onchange={this.onChange}
									value={degree || location}
									name={"degree" || "location"}
									disabled={disabled}
									cols={12}
								/>
							</div>
							{fieldofstudy && (
								<div className="row">
									<TextFieldInput
										onchange={this.onChange}
										value={fieldofstudy}
										name="fieldofstudy"
										disabled={disabled}
										cols={12}
									/>
								</div>
							)}
						</div>
						<div className="col-4">
							{disabled ? (
								<div className="row">
									<TextFieldInput
										onchange={this.onChange}
										value={momentum(from)}
										name="from"
										disabled={disabled}
										cols={12}
									/>
								</div>
							) : (
								<DateFieldInput value={from} cols={12} />
							)}
							{disabled ? (
								<div className="row">
									<TextFieldInput
										onchange={this.onChange}
										value={current ? "Current" : momentum(to)}
										name="to"
										disabled={disabled}
										cols={12}
									/>
								</div>
							) : (
								<DateFieldInput
									value={to}
									cols={12}
									name="to"
									onchange={this.onChange}
								/>
							)}{" "}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<TextAreaFieldInput
									name="description"
									value={description}
									disabled={disabled}
									cols={12}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DisplaySectionCard.propTypes = {
	index: PropTypes.number,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	school: PropTypes.string,
	title: PropTypes.string,
	degree: PropTypes.string,
	location: PropTypes.string,
	fieldofstudy: PropTypes.string,
	from: PropTypes.string,
	to: PropTypes.string,
	description: PropTypes.string
};

export default DisplaySectionCard;
