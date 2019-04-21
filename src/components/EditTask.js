import React from "react";
import moment from "moment";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

const divCardStyle = {
  fontSize: "14px",
  textAlign: "center",
  margin: "10px",
  paddingBottom: "15px",
  border: "2px solid pink"
};

class EditTask extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      quantity: "",
      date: "",
      selectedDay: undefined,
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.mockData.name,
      quantity: this.props.mockData.quantity,
      date: this.props.mockData.date,
      selectedDay: this.props.mockData.due,
      id: this.props.mockData.id
    });
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

  //Fix: on submit "created at" is disapearing
  handleOnSubmit = event => {
    event.preventDefault();
    let formData = {
      name: this.state.name,
      quantity: this.state.quantity,
      date: this.state.date,
      due: this.state.due
    };
    this.props.save(this.state.id, formData);
  };

  render() {
    return (
      <React.Fragment>
        <div style={divCardStyle}>
          <form onSubmit={this.handleOnSubmit}>
            <p>
              Task name:{" "}
              <input
                className="edit-input"
                type="text"
                name="name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </p>

            <p>
              Qty:{" "}
              <input
                className="edit-input"
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={event =>
                  this.setState({ quantity: event.target.value })
                }
              />
            </p>
            <p>Created at: {this.state.date}</p>

              Due date: <br/>
              <DayPickerInput
                onDayChange={this.handleDayClick}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={this.props.mockData.date}
              />


            <button onClick={() => this.props.cancel()}>Cancel</button>
            <button onClick={() => console.log("clicked")}>Save</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditTask;
