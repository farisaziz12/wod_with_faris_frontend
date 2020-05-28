import React, { Component } from "react";
import PopPop from "react-poppop";
import "./Schedule.css";

export default class Schedule extends Component {
  render() {
    const { show, toggleShow } = this.props;
    return (
      <div>
        <PopPop
          position="centerCenter"
          open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => toggleShow(false)}
          closeOnOverlay={true}
        >
          <h1 className="schedule-title">Schedule</h1>
          <div className="schedule-container">
            <h3 className="schedule-h3">
              Classes with less than 2 people will be cancelled up to 4 hours
              before class start time and early morning classes before 10:00
              will be cancelled the night before at 20:00
            </h3>
            <p>
              <strong>Monday:</strong> Outdoor Workout of the Day @ 12:15 &
              Teens Outdoor WOD & 17:30
            </p>
            <p>
              <strong>Tuesday:</strong> Outdoor Workout of the Day @ 12:15
            </p>
            <p>
              <strong>Wednesday:</strong> Outdoor Workout of the Day @ 9:00 &
              Teens Outdoor WOD & 17:30
            </p>
            <p>
              <strong>Thursday:</strong> Zoom Workout of the Day @ 7:00 &
              Outdoor Workout of the Day @ 12:15
            </p>
            <p>
              <strong>Friday:</strong> Outdoor Workout of the Day @ 9:00
            </p>
            <p>
              <strong>Saturday:</strong> Outdoor Mobility Class @ 10:00 &
              Outdoor WOD @ 10:30
            </p>
            <p>
              <strong>Sunday:</strong> Outdoor Workout of the Day @ 10:00
            </p>
            <p>
              <strong>
                Email{" "}
                <a href="mailto:faziztraining@gmail.com">
                  faziztraining@gmail.com
                </a>{" "}
                if you would like to suggest a new class time
              </strong>
            </p>
          </div>
        </PopPop>
      </div>
    );
  }
}
