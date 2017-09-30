import React from 'react';
import Word from "./Word";
import 'font-awesome/css/font-awesome.min.css';

const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default class Reader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			words: [],
			wordIdx: 0,
			playing: false,
			lastWord: false,
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
	}

	nextWord = () => {
		if (this.state.playing) {
			this.setState({wordIdx: this.state.wordIdx + 1});
			if (this.state.wordIdx === this.state.words.length - 1) {
				this.setState({playing: false, lastWord: true});
			}
		}
	};

	handlePlay = () => {
		if (this.state.lastWord) {
			this.setState({wordIdx: 0, playing: false, lastWord: false});
			return;
		}

		this.setState({playing: !this.state.playing});
	};

	getButtonState = () => {
		if (this.state.lastWord) return "undo";

		return this.state.playing ? "pause" : "play";
	};

	handleBack = () => {
		let newIdx = this.state.wordIdx - 10;
		newIdx = newIdx < 0 ? 0 : newIdx;
		this.setState({wordIdx: newIdx, lastWord: false});
	};

	render() {
		const word = this.state.words[this.state.wordIdx];
		const {playing, lastWord} = this.state;

		return (
			<div className="reader">
				<div className="main">
					<div className="textReader">
						<div className="v-line-dark">&nbsp;</div>
						<div className="v-line-mask">&nbsp;</div>
						<Word node={word} playing={playing} lastWord={lastWord} nextWord={this.nextWord}/>
					</div>
				</div>
				<div className="tools">
					<div className="button">Speed</div>
					<div className="button" onClick={this.handleBack}>Back</div>
					<div className="button" onClick={this.handlePlay}>
						<i className={`fa fa-${this.getButtonState()}`} aria-hidden="true"/>
					</div>
				</div>
			</div>
		)
	}

}
