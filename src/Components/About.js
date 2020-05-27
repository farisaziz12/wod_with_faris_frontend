import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import farisPic from "../Images/faris_img.JPG";
import aboutImg1 from "../Images/about_img_1.JPG";
import vbc from "../virtual_business_card/vbc.vcf";
import Badge from "react-bootstrap/Badge";
import "./About.css";

export default function About() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  return (
    <div>
      <h1>About</h1>
      <Container fluid>
        <p className="about-txt">
          WOD-WITH-FARIS was created with the sole purpose of making high
          quality fitness coaching easily accesible to the masses. Workouts are
          designed for athletes of all levels and from all backgrounds. They are
          scalable and adjustable to any injury and the inclusion or exclusion
          of equipment. The W-W-F program is fashioned to increase atheltic
          perfomance (power, speed, endurance & stength) along with help improve
          general health and quality of life.
        </p>
        <Image className="about-main-img" src={aboutImg1} fluid={true} />
        <h2 className="about-team-heading">The Team</h2>
        <Image className="about-team-img" src={farisPic} thumbnail />
        <h3 className="about-team-heading-2">Founder and Coach: Faris Aziz</h3>
        <Button className="contact-button" variant="primary">
          <a className="contact-button" href={vbc}>
            Contact
          </a>
        </Button>
        <h2 className="about-team-heading">Qualifications:</h2>
        <p className="qualifications-txt">- CrossFit Level 2 Trainer</p>
        <p className="qualifications-txt">- CrossFit Level 1 Trainer</p>
        <p className="qualifications-txt">- CrossFit Scaling Certificate</p>
        <p className="qualifications-txt">
          - CrossFit Spot the Flaw Certificate
        </p>
        <p className="qualifications-txt">
          - CrossFit Lesson Planning Certificate
        </p>
        <p className="qualifications-txt">
          Experience With:
          <Badge className="experience-pill" pill variant="primary">
            Strongman
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            Gymnastics
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            Olympic Lifting
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            Functional Training
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            Powerlifting
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            Aerobic Capacity Training
          </Badge>
          <Badge className="experience-pill" pill variant="primary">
            5+ Years CrossFit
          </Badge>
        </p>
      </Container>
    </div>
  );
}
