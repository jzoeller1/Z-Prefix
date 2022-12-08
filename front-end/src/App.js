// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       message: ''
//     };
//   };
//   componentDidMount() {
//     this.setState({
//       message: 'Hello, world'
//     })
//   };
//   render() {
//     return (
//       <div>
//         {this.state.message}
//       </div>
//     )
//   }
// }

// const App = () => {
//   const [message, setMessage] = useState('');
//   useEffect(() => {setMessage('Hello, world! Is this updating??? Yes it is!!! Muhahahhaha!')}, []);
//   return (
//     <div>
//       {message}
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';

const Home = () => {

  const [item, setItem] = useState([]);

  useEffect(
    () => {
      async function getItems() {
        const response = await fetch('http://localhost:8084/items');
        const data = await response.json();
        setItem(data);
      }
      getItems();
    }, [])

  return (
    <div>
      {item.map((item, index) => {
        return (
          <div>
            key={item.id}
            <h1>item: {item.item_name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
