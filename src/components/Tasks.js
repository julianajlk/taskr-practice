import React from "react";
import moment from "moment";

const divCardStyle = {
  fontSize: "14px",
  textAlign: "center",
  margin: "10px",
  paddingBottom: "15px",
  border: "2px solid pink"
};

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      likes: 1,
      dislikes: 0,
      classLike: false,
      classDislike: false,
      due: ""
    };
  }

  componentDidMount() {
    let dueArray = this.props.mockData.due.split('/')
    console.log(dueArray)
    let dueDate = [dueArray[2], dueArray[0], dueArray[1]].join("")
    console.log(dueDate)
    console.log(moment(dueDate, "YYYYMMDD").fromNow())
    this.setState({
      due: moment(dueDate, "YYYYMMDD").fromNow()
    })
  }

  handleLike = (event) => {
    //console.log(event.target.name)
    if (this.state.classLike === false) {
      this.setState((state, props) => ({
        likes: state.likes + 1,
      }));
    } else {
      this.setState((state, props) => ({
        likes: state.likes - 1,
      }));
    }
  };

  toggleClassLike = () => {
    this.setState((state, props) => ({
      classLike: !state.classLike
    }));
  }

  handleDislike = () => {
    if (this.state.classDislike === false) {
      this.setState((state, props) => ({
        dislikes: state.dislikes + 1,
      }));
    } else {
      this.setState((state, props) => ({
        dislikes: state.dislikes - 1,
      }));
    }
  };

  toggleClassDislike = () => {
    this.setState((state, props) => ({
      classDislike: !state.classDislike
    }));
  }


  render() {
    return (
      <React.Fragment>
        <div style={divCardStyle}>
          <h2>{this.props.mockData.name}</h2>
          <button
            name="like"
            className={this.state.classLike ? "liked like-button" : "like-button"}
            onClick={(event)=> {this.handleLike(event); this.toggleClassLike()}}
          >
            Like <span role="img" aria-label="heart">❤️</span><span class="likes-counter"> {this.state.likes}</span>
          </button>
          <button
            className={this.state.classDislike ? "liked like-button" : "like-button"}
            onClick={(event)=> {this.handleDislike();   this.toggleClassDislike()}}
          >
            Dislike <span role="img" aria-label="heart">💩</span><span> {this.state.dislikes}</span>
          </button>
          <p>Qty: {this.props.mockData.quantity}</p>
          <p>Created at: {this.props.mockData.date}</p>
          <p>Due date: {this.state.due}</p>
          <button onClick={() => this.props.edit()}>Edit</button>
          <button onClick={() => console.log("clicked")}>Delete</button>

          <style>{`
                    .like-button {
                      background-color: #95c5ec;
                    }
                     .liked {
                          font-weight: bold;
                          color: #fa0742;
                     }
                  `}</style>
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
