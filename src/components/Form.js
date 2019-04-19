import React from "react";
import moment from "moment";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';
import 'react-day-picker/lib/style.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      quantity: 1,
      count: 0,
      date: moment().format("MM/DD/YYYY"),
      selectedDay: undefined
    };
  }

  handleDayClick = (day, {selected}) => {
    //check if date has been selected or not
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
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
            Created:
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={event => this.handleOnChange(event)}
            />
          </label>
          {this.state.selectedDay && <p>Due: {this.state.selectedDay.toLocaleDateString()}</p>}
       {!this.state.selectedDay && <p>Select a due date:</p>}
       <DayPickerInput
        onDayChange={this.handleDayClick}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`} 
       />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
