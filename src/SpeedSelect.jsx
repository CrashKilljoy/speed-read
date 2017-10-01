import React from 'react'
import PropTypes from 'prop-types';

export default class SpeedSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {offset: 0};
	}

	generateButtons = () => {
		let buttons = [];
		for (let i = 0; i < 8; i++) {
			const speed = i * 100 + 100 + this.state.offset;
			buttons.push(
				<div key={i} className="button" onClick={() => this.props.changeSpeed(speed)}>{speed}</div>
			);
		}
		return buttons;
	};

	updateOffset = () => {
		if (this.state.offset === 0) {
			this.setState({offset: 50});
		} else {
			this.setState({offset: 0});
		}
	};

	render() {
		const sign = this.state.offset === 0 ? "+" : "-";

		return (
			<div className="speedSelect">
				{this.generateButtons()}
				<div className="button" onClick={this.updateOffset}>{sign}50</div>
			</div>
		);
	}
}

SpeedSelect.propTypes = {
	changeSpeed: PropTypes.func.isRequired,
};
