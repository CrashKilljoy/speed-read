import React from 'react';
import Word from "./Word";
import 'font-awesome/css/font-awesome.min.css';

const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default class Reader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			words: [],
			wordIdx: 0
		};
	}

	componentDidMount() {
		this.setState({words: this.textToNodes(longText)});
	}

	textToNodes = (text) => {
		text = "3\n 2\n 1\n " + text.trim('\n').replace(/\s+\n/g, '\n');
		return text
			.replace(/[,.!:;](?!["')\]}])/g, "$& ")
			.split(/[\s]+/g)
			.filter(word => word.length)
			.map(this.wordToNode);
	};

	wordToNode = (word) => {
		let node = {'class': 'word'};
		node.word = word;
		node.orpIdx = Reader.getORPIndex(node.word);
		return node;
	};

	static getORPIndex(word) {
		let length = word.length;
		let lastChar = word[word.length - 1];
		if (lastChar === '\n') {
			lastChar = word[word.length - 2];
			length--;
		}
		if (',.?!:;"'.indexOf(lastChar) !== -1) length--;
		return length <= 1 ? 0 :
			(length === 2 ? 1 :
				(length === 3 ? 1 :
					Math.floor(length / 2) - 1));
	};

	nextWord = () => {
		if (this.state.wordIdx < this.state.words.length) {
			this.setState({wordIdx: this.state.wordIdx + 1})
		}
	};

	render() {
		const word = this.state.words[this.state.wordIdx];

		return (
			<div className="reader">
				<div className="main">
					<div className="textReader">
						<div className="v-line-dark">&nbsp;</div>
						<div className="v-line-mask">&nbsp;</div>
						<Word node={word} nextWord={this.nextWord}/>
					</div>
				</div>
				<div className="tools">
					<div className="button">Speed</div>
					<div className="button">Back</div>
					<div className="button"><i className="fa fa-play" aria-hidden="true"/></div>
				</div>
			</div>
		)
	}
}
