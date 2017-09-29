import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";

export default class Reader extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<Col xs={9}>
						<div>text</div>
					</Col>
					<Col xs={3}>
						<Button>Speed</Button>
						<Button>Back</Button>
						<Button>Pause</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}
