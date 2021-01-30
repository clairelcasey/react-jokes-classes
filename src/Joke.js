
import React from "react";
import "./Joke.css";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';

/** A single joke, along with vote up/down buttons. 
 * 
 * Props:
 * - id
 * - vote: function to call in parent
 * - votes
 * - text
 * 
 * JokeList -> Joke
 * 
*/

function Joke({ id, vote, votes, text, lockJoke, isLocked }) {
  return (
    <div className="Joke">
      <div className="Joke-votearea">



        <button onClick={evt => vote(id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={evt => vote(id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}
        <span>
        <IconButton className="Icon-Button" onClick={evt => lockJoke(id)} >
          {(isLocked) ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>

        </span>
      </div>
    </div>
  );
}

export default Joke;
