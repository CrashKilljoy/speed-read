import React from 'react';
import {Button, ButtonGroup, Col, Container, Row} from "reactstrap";

export default class Reader extends React.Component {
	render() {
		return (
			<Container className="reader">
				<Row>
					<Col xs={9}>
						<div>text</div>
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
