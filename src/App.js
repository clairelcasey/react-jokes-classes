import React from "react";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. 
 * State:
 * - none
 * 
 * Props:
 * - none
 * 
 * App -> JokeList
 * 
*/

function App() {
  // localStorage.clear()
  return (
    <div className="App">
      <JokeList />
    </div>
  );
}

export default App;
