import React, { Component } from "react";
import dateFormat from "dateformat";
import PopPop from "react-poppop";
import "./Classes.css";

export default class CoachPTSessionCard extends Component {
  state = {
    show: false,
    askDeleteConfirm: false,
    editMode: false,
    ptDescription: this.props.upcomingPTSession.description,
    ptLocation: this.props.upcomingPTSession.location,
    ptTime: this.props.upcomingPTSession.time,
    ptDate: this.props.upcomingPTSession.date,
    ptPrice: this.props.upcomingPTSession.price,
    ptPaid: this.props.upcomingPTSession.paid,
  };

  componentDidMount() {}

  handleDeletePTSession = (id) => {
    fetch(
      `https://wod-with-faris-backend.herokuapp.com/ptsessions/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((resp) => resp.json())
      .then((deletedBooking) => this.handleDeletedBooking(deletedBooking));
  };

  handleDeletedBooking = (deletedBooking) => {
    this.props.handleCancel(deletedBooking);
    this.setState({ askDeleteConfirm: false });
  };

  toggleShow = (show) => {
    this.setState({ show: show });
  };
  toggleDeleteConfirm = () => {
    this.setState({ askDeleteConfirm: !this.state.askDeleteConfirm });
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (id) => {
    fetch(
      `https://wod-with-faris-backend.herokuapp.com/ptsessions/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: this.state.ptDescription,
          location: this.state.ptLocation,
          time: this.state.ptTime,
          date: this.state.ptDate,
          price: parseInt(this.state.ptPrice),
        }),
      }
    ).then(this.setState({ editMode: false }));
  };

  handlePayWithCash = (id) => {
    fetch(
      "https://wod-with-faris-backend.herokuapp.com/ptsessions/confirmptsession",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pt_session: id,
        }),
      }
    ).then(this.setState({ ptPaid: true }));
  };

  render() {
    const { upcomingPTSession, client } = this.props;
    const {
      show,
      askDeleteConfirm,
      editMode,
      ptDescription,
      ptLocation,
      ptTime,
      ptDate,
      ptPrice,
      ptPaid,
    } = this.state;
    return (
      <div className="coach-class-card">
        <h2 className="card-title">
          {upcomingPTSession.time + " " + upcomingPTSession.name}
        </h2>
        <p className="card-date">
          {dateFormat(upcomingPTSession.date, "fullDate")}
        </p>
        {askDeleteConfirm ? (
          <div>
            {" "}
            <button
              onClick={() => this.handleDeletePTSession(upcomingPTSession.id)}
              className="book-btn"
            >
              Confirm Delete
            </button>{" "}
            <button onClick={this.toggleDeleteConfirm} className="book-btn">
              Cancel Delete
            </button>{" "}
          </div>
        ) : (
          <button onClick={this.toggleDeleteConfirm} className="book-btn">
            Delete Class
          </button>
        )}
        {askDeleteConfirm ? undefined : (
          <button onClick={() => this.toggleShow(true)} className="book-btn">
            More Info
          </button>
        )}
        <PopPop
          position="centerCenter"
          open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => this.toggleShow(false)}
          closeOnOverlay={true}
        >
          <h1 className="workout-title">
            {upcomingPTSession.time + " " + upcomingPTSession.name}
          </h1>
          <div>
            <p style={{ textAlign: "center", color: "black" }}>
              Status:{" "}
              <p style={ptPaid ? { color: "green" } : { color: "red" }}>
                {ptPaid ? "Paid" : "Not Paid"}
              </p>
            </p>
          </div>
          {!ptPaid && (
            <button
              onClick={() => this.handlePayWithCash(upcomingPTSession.id)}
              className="pay-cash-btn"
            >
              Pay with Cash
            </button>
          )}
          <h3 className="desc-txt">
            Client: {client.first_name + " " + client.last_name}
          </h3>
          <h3 className="desc-txt">
            Price: CHF{" "}
            {!editMode ? (
              ptPrice
            ) : (
              <input
                type="number"
                name="ptPrice"
                value={ptPrice}
                onChange={this.handleChange}
              />
            )}
          </h3>
          <h3 className="desc-txt">
            Location:{" "}
            {!editMode ? (
              ptLocation
            ) : (
              <input
                type="text"
                name="ptLocation"
                value={ptLocation}
                onChange={this.handleChange}
              />
            )}
          </h3>
          <h3 className="desc-txt">
            Date:{" "}
            {!editMode ? (
              dateFormat(ptDate, "fullDate")
            ) : (
              <input
                type="date"
                name="ptDate"
                value={ptDate}
                onChange={this.handleChange}
              />
            )}
          </h3>
          <h3 className="desc-txt">
            Time:{" "}
            {!editMode ? (
              ptTime
            ) : (
              <input
                type="time"
                name="ptTime"
                value={ptTime}
                onChange={this.handleChange}
              />
            )}
          </h3>
          {!editMode ? (
            ptDescription
              .split("\n")
              .map((sentence) => <p className="desc-txt">{sentence}</p>)
          ) : (
            <textarea
              className="edit-desc"
              value={ptDescription}
              onChange={this.handleChange}
              name="ptDescription"
            />
          )}
          <div>
            {!editMode ? (
              <button className="book-btn" onClick={this.toggleEditMode}>
                Edit Workout
              </button>
            ) : (
              <button
                className="book-btn"
                onClick={() => this.handleSubmit(upcomingPTSession.id)}
              >
                Submit
              </button>
            )}
          </div>
        </PopPop>
      </div>
    );
  }
}
