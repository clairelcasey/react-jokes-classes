import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. 
 * 
 * Props:
 * - numJokesToGet
 * 
 * State:
 * - jokes
 * - isLoading
 * 
 * App -> JokeList -> Joke
 * 
*/

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  /* retrieve jokes from API on mount and when isLoading or numJokesToGet
  changes */

  useEffect(function getJokesFromApi() {
    async function getJokes() {
      try {
        // load jokes one at a time, adding not-yet-seen jokes
        let newJokes = [];
        let seenJokes = new Set();
  
        while (newJokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;
          // add the joke, them create new array of jokes at end (rather than
          // pushing each time). 
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            newJokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
        setIsLoading(false);
        setJokes(newJokes);
      } catch (err) {
        console.error(err);
      }
    }
    if (isLoading) getJokes()
  }, [isLoading, numJokesToGet]);

  /* set to loading state to true which will trigger useEffect */

  function generateNewJokes() {
    setIsLoading(true);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes(jks => (
      jks.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j)
    ));
  }

  /* Either loading spinner or list of sorted jokes. */
  // TODO: can just say jokes rather than spreading (can sort in place)
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
        </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
}

export default JokeList;
