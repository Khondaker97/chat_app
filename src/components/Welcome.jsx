import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="welcoming robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (max-width: 720px){
    img {
      height: 15rem;
    }
    h3{
      padding: 2rem;
    }
  }
  @media screen and (max-width: 540px){
    img {
      height: 10rem;
    }
    h1{
      font-size: 1.5rem;
      padding: 2rem;
    }
    h3{
      font-size: 0.8rem;
    }
  }
`;
export default Welcome;
