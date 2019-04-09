import React from "react";
import moment from "moment";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      quantity: 1,
      count: 0,
      date: moment().format("MM/DD/YYYY"),
      due: moment().format("MM/DD/YYYY"),
      selectedDay: undefined
    };
  }

  handleDayClick = day => {
    this.setState({
      selectedDay: day
    })
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      count: event.target.value.length
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    if (this.state.task && this.state.quantity && this.state.date) {
      alert("Task submitted: " + this.state.task);
      console.log(this.state);
      // this.sendFormData(this.state);
      // fetch('the server URL', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type: application/json'
      //   },
      //   body: JSON.stringify(this.state)
      // })
    } else {
      alert("You must fill in the entire form");
    }
    this.setState({
      task: ""
    });
    // event.target.reset();
  };

  render() {
    return (
      <div className="create-form">
        <h3>Create a new task!</h3>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <label>
            Task name:
            <input
              type="text"
              name="task"
              value={this.state.task}
              count={this.state.count}
              placeholder="Type your task here..."
              onChange={event => this.handleOnChange(event)}
            />
            <p>Characters left (max 140): {140 - this.state.count}</p>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={event => this.handleOnChange(event)}
            />
          </label>
          <label>
            Due:
            <input
              type="text"
              name="due"
              value={this.state.due}
              onChange={event => this.handleOnChange(event)}
            />
          </label>
          <label>
            Created:
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={event => this.handleOnChange(event)}
            />
          </label>
          {this.state.selectedDay ? (
          <p>Your due date is: {this.state.selectedDay.toLocaleDateString()}</p>
        ) : (
          <p>Please select a day:</p>
        )}
          <DayPicker onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
