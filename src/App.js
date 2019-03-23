import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
import EditTask from "./components/EditTask";
import tasksData from "./tasks.json";

// const mockData = {
//   name: "To Do 1",
//   task: {
//     name: "Buy oranges",
//     quantity: 3
//   }
// };

// const mockData = {
//   name: "Buy apples",
//   quantity: 3,
//   date: "10/25/2018"
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      selectedTaskId: "1",
      mockData: tasksData.tasks
    };
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  updateTaskInfo = (taskId, info) => {
    let newTasksArray = this.state.mockData.map(task => {
      if (task.id === taskId) {
        return {
          ...tasksData,
          name: info.name,
          quantity: info.quantity
        };
      } else {
        return task;
      }
    });
    this.setState({
      mockData: newTasksArray,
      editing: !this.state.editing
    });
  };
  render() {
    // let selectedTask = this.state.tasks.find(task => task.id === this.state.selectedTaskId)

    //Pass in functions from parent to child to listen to onClick of button
    // let taskOrEdit = this.state.editing
    //   ? this.state.mockData.map(task => (
    //       <EditTask
    //         mockData={task}
    //         cancel={this.toggleEdit}
    //         save={this.updateTaskInfo}
    //       />
    //     ))
    //   : this.state.mockData.map(task => (
    //       <Tasks mockData={task} edit={this.toggleEdit} />
    //     ));

    return (
      <div>
        <Navbar />
        {/* {this.state.selectedTaskId ? taskOrEdit : null} */}
        {this.state.editing
          ? this.state.mockData.map(task => (
              <EditTask
                mockData={task}
                cancel={this.toggleEdit}
                save={this.updateTaskInfo}
              />
            ))
          : this.state.mockData.map(task => (
              <Tasks mockData={task} edit={this.toggleEdit} />
            ))}

        <Form />
      </div>
    );
  }
}

export default App;
