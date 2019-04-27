import React from "react";
import moment from "moment";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      quantity: 1,
      count: 0,
      date: moment().format("MM/DD/YYYY"),
      selectedDay: undefined,
      isPriority: false
    };
  }

  handleDayClick = (day, {selected}) => {
    console.log(day)
    //format day
    let formatedDay = moment(day).format('L')
    //check if date has been selected or not
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({
      selectedDay: formatedDay
    })
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      count: event.target.value.length
    });
  };

  handleCheckbox = event => {
    this.setState({
      isPriority: !this.state.isPriority
    })
  }

  //not functioning yet
  handleOnSubmit = event => {
    event.preventDefault();
    if (this.state.task && this.state.quantity && this.state.date && this.state.selectedDay) {
      console.log(this.state);
      let data = {name: this.state.task, quantity: this.state.quantity, date: this.state.date, due: this.state.selectedDay}
      console.log(data)
      fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)
      })
    } else {
      alert("You must fill in the entire form");
    }
    this.setState({
      task: "",
      quantity: 1,
      count: 0,
      selectedDay: undefined
    });
    event.target.reset();
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


          Due date: <br/>
          <DayPickerInput
            onDayChange={this.handleDayClick}
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`Click to select a day`}
          />

          <div>
            <p>Is this a priority?</p>
            <input type="checkbox" id="yes" name="yes" onClick={this.handleCheckbox}/>
            <label for="yes">Yes</label>
         </div>

         <div>

         </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
