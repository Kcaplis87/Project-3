import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";

function Charity({ charityName, url, donationUrl, city, state, score, category, missionStatement, Button }) {
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{charityName}</h3>
          {missionStatement && <h5 className="font-italic">{missionStatement}</h5>}
        </Col>
        <Col size="md-4">
          <div className="btn-container">
            <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={url}>
              View
            </a>
            <Button />
          </div>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <p className="font-italic small">Category: {category}</p>
        </Col>
      </Row>
      <Row>
        <Col size="12 sm-4 md-2">
          <p>City: {city} State: {state}</p>
        </Col>
        <Col size="12 sm-8 md-10">
          <p>Charity Score: {score}</p>
          <p>Donation URL: {donationUrl}</p>
        </Col>
      </Row>
    </ListItem>
  );
}

export default Charity;