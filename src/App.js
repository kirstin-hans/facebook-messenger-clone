import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import Message from "./components/Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
//import ChatIcon from "@material-ui/icons/Chat";
import { Send } from "@material-ui/icons";
// import { IconButton } from "@material-ui/core"; // wraps icon and treats it as a button

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      text: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      {/* <ChatIcon /> */}
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/1041/1041916.svg"
        alt="chat-icon"
        width="80"
        height="80"
      />
      <h1>Messenger App</h1>
      <h2>Welcome {username} 👋</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          {/* <InputLabel htmlFor="my-input">Enter a message...</InputLabel> */}
          <Input
            className="app__input"
            placeholder="Enter a message..."
            id="my-input"
            aria-describedby="my-helper-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input} // add regex for space chars ?
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
          >
            <Send />
          </IconButton>
          {/* <Button
            disabled={!input} // add regex for space chars ?
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
          >
            Send Message
          </Button> */}
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, ...message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default App;
