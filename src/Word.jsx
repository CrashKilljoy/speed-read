import React from 'react'
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout'

const waitAfterShortWord = 1.2;
const waitAfterComma = 2;
const waitAfterPeriod = 3;
const waitAfterParagraph = 3.5;
const waitAfterLongWord = 1.5;

let timer = {};

class Word extends React.Component {
	constructor(props) {
		super(props);
	}

	static getDelay(node, speed) {
		let factor = 1;

		const word = node.word;
		let lastChar = word[word.length - 1];
		if (lastChar.match('”|"')) lastChar = word[word.length - 2];
		if (lastChar === '\n') factor = waitAfterParagraph;
		if ('.!?'.indexOf(lastChar) !== -1) factor = waitAfterPeriod;
		if (',;:–'.indexOf(lastChar) !== -1) factor = waitAfterComma;
		if (word.length < 4) factor = waitAfterShortWord;
		if (word.length > 11) factor = waitAfterLongWord;

		return factor * 60 * 1000 / speed;
	}

	componentWillReceiveProps(nextProps) {
		this.props.clearTimeout(timer);
		if (nextProps.lastWord) {
			return;
		}

		if (nextProps.node !== this.props.node || nextProps.speed !== this.props.speed) {
			timer = this.props.setTimeout(this.props.nextWord, Word.getDelay(nextProps.node, nextProps.speed));
			return;
		}

		if (nextProps.playing === true && this.props.playing === false) {
			this.props.nextWord();
		}
	}

	componentDidMount() {
		if (this.props.playing) {
			this.props.nextWord();
		}
	}

	createNode = (node) => {
		const first = node.word.substring(0, node.orpIdx);
		const middle = node.word.substring(node.orpIdx, node.orpIdx + 1);
		const last = node.word.substring(node.orpIdx + 1, node.word.length);

		return (
			<div className="word"><span className="first">{first}</span><span><mark>{middle}</mark>
				{last}</span></div>
		)
	};

	render() {
		const {node} = this.props;
		if (node) {
			return this.createNode(node);
		} else {
			return null;
		}
	}
}

Word.propTypes = {
	setTimeout: PropTypes.func.isRequired,
	clearTimeout: PropTypes.func.isRequired,
	playing: PropTypes.bool.isRequired,
	lastWord: PropTypes.bool.isRequired,
	node: PropTypes.object,
	nextWord: PropTypes.func.isRequired,
	speed: PropTypes.number.isRequired,
};

export default ReactTimeout(Word)
