/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute, host } from "../utils/apiRoutes";
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [currChat, setCurrChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const socketRef = useRef();

  useEffect(() => {
    if (currUser) {
      socketRef.current = io(host);
      socketRef.current.emit("add-user", currUser._id);
    }
  }, [currUser]);


  useEffect(() => {
    const fetchLogin = async()=>{

      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrUser(await JSON.parse(localStorage.getItem("user")));
        setIsLoaded(true);
      }
    }
    fetchLogin();
  }, []);

  useEffect(() => {
    const fetchUser = async()=>{
      if (currUser) {
        if (currUser.isAvatarSet) {
          const response = await axios.get(`${allUsersRoute}/${currUser._id}`);
          setContacts(response.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchUser();
  }, [currUser]);

  const handleChatChange = (chat) => {
    setCurrChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currChat === null ? (
          <Welcome currentUser={currUser} />
        ) : (
          <ChatContainer
            currentChat={currChat}
            currentUser={currUser}
            socket={socketRef}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (max-width: 720px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 540px) {
        grid-template-columns: 40% 60%;
        width: 100%;

    }
  }
`;
export default Chat;
