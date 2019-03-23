import React from "react";

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
      dislikes: 1,
      classLike: false,
      classDislike: false
    };
  }

  handleLike = () => {
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
    this.setState((state, props) => ({
      dislikes: state.dislikes - 1
    }));
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
          <p>Qty: {this.props.mockData.quantity}</p>
          <p>Created at: {this.props.mockData.date}</p>
          <button onClick={() => this.props.edit()}>Edit</button>
          <button onClick={() => console.log("clicked")}>Delete</button>
          <button
            className={this.state.classLike ? "liked like-button" : "like-button"}
            onClick={(event)=> {this.handleLike(); this.toggleClassLike()}}
          >
            Like <span role="img" aria-label="heart">❤️</span><span class="likes-counter"> {this.state.likes}</span>
          </button>
          <button
            className={this.state.classDislike ? "liked" : null}
            onClick={(event)=> {this.handleDislike();   this.toggleClassDislike()}}
          >
            Dislike <span role="img" aria-label="heart">💩</span><span> {this.state.dislikes}</span>
          </button>
          <style>{`
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