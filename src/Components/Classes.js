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

export default class Classes extends Component {
  state = {
    classes: [],
    chosenClass: null,
    user: null,
    isLoading: true,
    screenWidth: window.innerWidth,
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

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

  handleWindowSizeChange = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

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
    return classes.map((oneClass) => ({
      title: oneClass.name,
      start: moment(
        oneClass.date + " " + oneClass.time,
        "YYYY-MM-DD HH:mm"
      ).toDate(),
      end: moment(oneClass.date + " " + oneClass.time, "YYYY-MM-DD HH:mm")
        .add(1, "hours")
        .toDate(),
      allDay: false,
      id: oneClass.id,
    }));
  };

  removeSelectedClass = () => {
    this.setState({ chosenClass: null });
  };

  earliestClassOftheWeek = () => {
    return this.formatedClasses(this.state.classes).sort((a, b) =>
      moment(a.end).format("HH:mm") > moment(b.end).format("HH:mm")
        ? 1
        : moment(a.end).format("HH:mm") < moment(b.end).format("HH:mm")
        ? -1
        : 0
    );
  };

  render() {
    const { classes, isLoading, chosenClass, screenWidth } = this.state;
    const isMobile = screenWidth <= 500;
    return (
      <div>
        <h1 style={{ color: "white" }}>Book Class</h1>

        <div className="container">
          <Calendar
            onSelectEvent={this.handlePickClass}
            defaultView={isMobile ? "day" : "week"}
            views={["month", "week", "day"]}
            localizer={localizer}
            scrollToTime={classes[0] && this.earliestClassOftheWeek()[0].start}
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
