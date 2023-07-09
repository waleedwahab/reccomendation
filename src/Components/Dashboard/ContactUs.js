import React, { useState } from "react";
import styled from "styled-components";
import UserNavbar from "../Navbar/UserNavbar";
import Footer from "../Navbar/Footer";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border: 1px solid #fff;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 95%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function ContactUs() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compose the email with the input values
    const composedEmail = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    // Open the default email client with the composed email
    window.location.href = composedEmail;
  };

  return (
    <>
      <UserNavbar />
      <ContactContainer sx={{ width: '95%' }}>
        <Title>Contact Us</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <TextArea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="15"
            required
          />
          <SubmitButton type="submit">Compose Email</SubmitButton>
        </Form>
      </ContactContainer>
      <Footer />
    </>
  );
}

export default ContactUs;
