import React from "react";

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
      due: "",
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.mockData.name,
      quantity: this.props.mockData.quantity,
      due: this.props.mockData.due,
      id: this.props.mockData.id
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let formData = {
      name: this.state.name,
      quantity: this.state.quantity
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
            <p>
              Due date:{" "}
              <input
                className="edit-input"
                type="text"
                name="due"
                value={this.state.due}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </p>
            <p>Created at: {this.props.mockData.date}</p>
            <button onClick={() => this.props.cancel()}>Cancel</button>
            <button onClick={() => console.log("clicked")}>Save</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditTask;
