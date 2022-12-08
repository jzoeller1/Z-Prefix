import React, { useEffect } from 'react';

class App extends React.component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  };
  componentDidMount() {
    this.setState({
      message: 'Hello, world'
    })
  };
  render() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}

export default App;