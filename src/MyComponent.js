import React from "react";

class MyComponent extends React.Component {
  state = {
    delay: 1000, // Initial delay of 1 second
  };

  async delayLoop() {
    for (let i = 0; i < 500; i++) {
      console.log(i);
      await new Promise((resolve) => setTimeout(resolve, this.state.delay));
    }
  }

  handleSliderChange = (event) => {
    this.setState({ delay: event.target.value });
  };

  handleClick = () => {
    this.delayLoop();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Start loop</button>
        <input
          type="range"
          min="100"
          max="5000"
          value={this.state.delay}
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}

export default MyComponent;
