import "./App.css";
import logo_DGTCP from "./assets/logo_DGTCP.png";
import DGTCP_BOT_LOGO from "./assets/logo_DGTCP.png";
//import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
 
import React,{ useEffect, useRef,useState } from "react";
import { sendMessageToOpenAI } from "./bot.js";

//import { sendMessageToOpenAI } from "./liamaBot.js";

import LoginForm from './login.js';
import userLogo from "./assets/user-icon.png";
//import userIcon from  './assets/user.svg';
//import home from "./assets/home.svg";
//import save from "./assets/bookmark.svg";
//import rocket from "./assets/rocket.svg";

import sendBtn from "./assets/send.svg";

function App() {
 
    const reloadPage = () => {
      window.location.reload();
    };

   
  
  
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  
  const [messages, setMessages] = useState([
    {
      text: ["Bonjour, je suis le robot conversationel de la DGTCP.",
              "Comment puis-je vous aidez s'il vous plaît ?"], // Changed "test" to "text" for consistency
      isBot: true,
    },
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [messages]);

/* 
  const handleQuery = async (e) =>{
    const buttonValue = e.target.dataset.value;
    const userMessage = { text: buttonValue, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input field

    try {
      const res = await sendMessageToOpenAI(buttonValue);
      const botMessage = { text: res, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = { text: input, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input field

    try {
      const res = await sendMessageToOpenAI(input);
      const botMessage = { text: res, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    }
  };
 */



  const sendMessage = async (text, isUserInput = true) => {
    const userMessage = { text, isBot: false };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    if (isUserInput) {
      setInput(""); // Clear input field
    }
  
    try {
      const res = await sendMessageToOpenAI(text);
      const botMessage = { text: res, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    }
  };
  const handleQuery = async (e) => {
    const buttonValue = e.target.dataset.value;
    await sendMessage(buttonValue, false);
  };
  
  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages
    await sendMessage(input);
  };
    



  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  /*console.log("APPKEY" + process.env.NODE_ENV);*/
  const [isActive , setisActive] = useState(false);

  const handleLoginFormOpen = () => {
    setisActive(!isActive);
  };


  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <div className="brand">
              <div className="brandid">
                <img src={logo_DGTCP} alt="DGTC" className="logo" />
                <span>Direction Général du Trésor Public</span>
              </div>
              {/* <button className="midBtn">
                <img src={addBtn} alt="Nouvelle discussion" /> Nouvelle
                discussion
              </button> */}
            </div>
          </div>

          <div className="upperSideBottom">
            <button className="query" data-value="C'est quoi le
              Trésor Public ?" onClick={handleQuery}>
              <img src={msgIcon} alt="Question par défaut"  /> C'est quoi le
              Trésor Public ?
            </button>
            <button className="query" data-value="Autre question par défaut" onClick={handleQuery}>
              <img src={msgIcon} alt="Question par défaut" /> Autre question par
              défaut
            </button>
          </div>
        </div>
        <div className="lowwerSide">
          <div className="listItems">
          <a alt="Accueil" onClick={reloadPage}>
            {/* <img alt="Accueil" src={home} className="listItemsImg" /> */}
            <i className="fi fi-rr-home"></i> {" "}
             Accueil </a>
          </div>
          {/*  <div className="listItems">
            <img alt="Enregistrer" src={save} className="listItemsImg" /> 
            <i className="fi fi-rr-bookmark"></i>
            <span>Enregistrer</span>
          </div>*/}
          <div className="listItems">
          <a onClick={handleLoginFormOpen}> 
            {/*  <img alt="Connexion" src={rocket} className="listItemsImg" /> */}
            <i className="fi fi-rr-user"></i> {" "}
            Connexion</a>
          </div>

          <div id="connexionForm"   className= { isActive ? "connexionForm show" : "hidden"}>
          <LoginForm />
          </div>

        </div>
      </div>
      <div className="main">
        <div className="chats">
         
{/* 
          <div className="chat user-query">
            <img className="chatImg" alt="Vous" src={userLogo} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div>

          <div className="chat bot">
            <img className="chatImg" alt="DGTP Bot" src={DGTCP_BOT_LOGO} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div>

          <div className="chat user-query">
            <img className="chatImg" alt="Vous" src={userLogo} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div>

          <div className="chat bot">
            <img className="chatImg" alt="DGTP Bot" src={DGTCP_BOT_LOGO} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div>

          <div className="chat user-query">
            <img className="chatImg" alt="Vous" src={userLogo} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div>

          <div className="chat bot">
            <img className="chatImg" alt="DGTP Bot" src={DGTCP_BOT_LOGO} />
            <p className="txt">
              Mollit mollit pariatur ea ad ex eiusmod qui nostrud nulla quis
              aute esse. Exercitation aliquip magna magna et laboris magna ipsum
              ut amet. Do irure elit commodo sint. Nostrud labore quis aute
              culpa labore ipsum adipisicing fugiat nisi. Aliqua est sunt
              cupidatat commodo magna id. Cillum magna amet in labore laboris
              labore nulla esse mollit nulla aute labore aliqua.
            </p>
          </div> */}

          {messages.map((message, i) => (
            <div
              key={i}
              className={message.isBot ? "chat bot" : "chat user-query"}
            >
              <img
                className="chatImg"
                alt={message.isBot ? "DGTP Bot" : "Vous"}
                src={message.isBot ? DGTCP_BOT_LOGO : userLogo}
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}

       <div ref={msgEnd}/>
        </div>

        <div className="chatsFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Tapez votre question ici."
              value={input}
              onKeyDown={handleEnter} 
              onChange={(e) => {
                setInput(e.target.value);
              }}
              name=""
              id=""
            ></input>

            <button className="send" onClick={handleSend}>
              <img alt="Envoyer" src={sendBtn} />
            </button>
          </div>

          <p className="small-note">
            Cet assistant peut faire des erreurs, vous pouvez confirmer les
            informations via notre centre d'appel au (229) 21301937 / 21308542.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
