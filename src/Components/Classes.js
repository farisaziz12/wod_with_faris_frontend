import React, { Component } from "react";
import ClassModal from "./ClassModal";
import ReactGA from "react-ga";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Classes.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

function initializeReactGA() {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
  ReactGA.pageview("/classes");
}

const localizer = momentLocalizer(moment);

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;

let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
let todaydate = yyyy + "-" + mm + "-" + dd;

export default class Classes extends Component {
  state = {
    classes: [],
    chosenClass: null,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    initializeReactGA();

    fetch(`https://wod-with-faris-backend.herokuapp.com/sessions`)
      .then((resp) => resp.json())
      .then((classes) =>
        this.setState({
          classes: classes,
          isLoading: false,
        })
      );

    fetch(
      `https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${this.props.currentUser.email}`
    )
      .then((resp) => resp.json())
      .then((user) => this.setState({ user }));
  }

  handleDateChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoading: true,
    });
    this.dateFetch(e.target.value);
  };

  handlePickClass = (e) => {
    const pickedClass = this.state.classes.find(
      (oneClass) => oneClass.id === e.id
    );
    this.setState({ chosenClass: pickedClass });
  };

  deductToken = () => {
    const { user } = this.state;
    this.setState({
      user: {
        id: user.id,
        coach: user.coach,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        tokens: user.tokens - 1,
      },
    });
    ReactGA.event({
      category: "User",
      action: `${
        this.state.user.first_name + " " + this.state.user.last_name
      } Booked a Class`,
    });
  };
  addToken = () => {
    const { user } = this.state;
    this.setState({
      user: {
        id: user.id,
        coach: user.coach,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        tokens: user.tokens + 1,
      },
    });
    ReactGA.event({
      category: "User",
      action: `${
        this.state.user.first_name + " " + this.state.user.last_name
      } Cancelled a Class`,
    });
  };

  dateFetch = (date) => {
    fetch(`https://wod-with-faris-backend.herokuapp.com/sessions?date=${date}`)
      .then((resp) => resp.json())
      .then((classes) =>
        this.setState({
          classes: classes,
          isLoading: false,
        })
      );
  };

  formatedClasses = (classes) => {
    Date.prototype.addHours = function (h) {
      this.setHours(this.getHours() + h);
      return this;
    };
    return classes.map((oneClass) => ({
      title: oneClass.name,
      start: new Date(oneClass.date + "T" + oneClass.time),
      end: new Date(oneClass.date + "T" + oneClass.time).addHours(1),
      allDay: false,
      id: oneClass.id,
    }));
  };

  removeSelectedClass = () => {
    this.setState({ chosenClass: null });
  };

  render() {
    const { classes, isLoading, chosenClass } = this.state;
    return (
      <div>
        <h1 style={{ color: "white" }}>Book Class</h1>

        <div className="container">
          <Calendar
            onSelectEvent={this.handlePickClass}
            defaultView={"week"}
            localizer={localizer}
            events={this.formatedClasses(classes)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, color: "black", backgroundColor: "white" }}
          />
          {isLoading && <button className="loading"></button>}
          {classes[0]
            ? chosenClass && (
                <ClassModal
                  addToken={this.addToken}
                  deductToken={this.deductToken}
                  user={this.state.user}
                  oneClass={chosenClass}
                  handlePickClass={this.handlePickClass}
                  removeSelectedClass={this.removeSelectedClass}
                />
              )
            : !isLoading && <h1 style={{ color: "white" }}>No Classes</h1>}
        </div>
      </div>
    );
  }
}
