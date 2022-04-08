import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currUserName, setCurrUserName] = useState();
  const [currUserImage, setCurrUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    if (currentUser) {
      setCurrUserImage(currentUser.avatarImage);
      setCurrUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currUserImage && currUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h1>{currUserName}</h1>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
    }
    @media screen and (max-width: 720px) {
      gap: 0.5rem;
      .img {
        height: 1.4rem;
      }
      h3{
        display: none;
      }
    }
    
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 95%;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        width: max-content;
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      @media screen and (max-width: 720px) {
        .avatar {
          img {
            width: 2rem;
          }
        }
        .username {
          h3 {
            font-size: 1.2rem;
          }
        }
      }
      @media screen and (max-width: 540px) {
        gap: 0.5rem;
        .username {
          h3 {
            font-size: 0.8rem;
          }
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;
    gap: 0.5rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h1 {
        color: white;
      }
    }
    @media screen and (max-width: 720px) {
      gap: 0.5rem;
      .avatar{

        img{
          width: 2rem;
        }
      }
      .username {
        h1 {
          font-size: 1.5rem;
        }
      }
    }
    @media screen and (max-width: 720px) {
      .username {
        h1 {
          font-size: 1.2rem;
        }
      }
    }
  }
`;
export default Contacts;
