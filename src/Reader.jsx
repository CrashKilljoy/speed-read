import React from 'react';
import {Button, ButtonGroup, Col, Container, Row} from "reactstrap";
import Word from "./Word";


const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

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
			<Container className="reader">
				<Row>
					<Col xs={9}>
						<Row className="textReader">
							<div className="v-line-dark">&nbsp;</div>
							<div className="v-line-mask">&nbsp;</div>
							<Word node={word} nextWord={this.nextWord}/>
						</Row>
					</Col>
					<Col xs={3}>
						<ButtonGroup vertical>
							<Button>Speed</Button>
							<Button>Back</Button>
							<Button>Pause</Button>
						</ButtonGroup>
					</Col>
				</Row>
			</Container>
		)
	}
}
