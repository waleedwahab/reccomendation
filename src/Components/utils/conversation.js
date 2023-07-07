import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../../Auth/firebase";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

const ConversationItem = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 20px;
  background-color: #ffffff;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const Sender = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function Conversation({ currentUser, sellingUser }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const senderId = urlParams.get("senderId");
    const receiverId = urlParams.get("receiverId");

    if (senderId && receiverId) {
      setSelectedConversation({ senderId, receiverId });
    }
  }, [location.search]);

  useEffect(() => {
    console.log(sellingUser);
    if (selectedConversation) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, `users/${selectedConversation.receiverId}/messages`),
          orderBy("timestamp")
        ),
        (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => doc.data());
          setMessages(messagesData);
        }
      );

      return () => unsubscribe();
    }
  }, [selectedConversation]);

  const handleSendMessage = async () => {
    if (!selectedConversation) {
      return;
    }

    if (newMessage.trim() === "") {
      return;
    }

    const message = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: newMessage,
      timestamp: new Date().toString(),
    };

    try {
      const docRef = await addDoc(
        collection(db, `users/${selectedConversation.receiverId}/messages`),
        message
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ConversationContainer>
      {/* Display the conversations */}
      {currentUser.sell && currentUser.sell.map((conversation) => (
        <ConversationItem
          key={conversation.price}
          onClick={() => setSelectedConversation(conversation)}
        >
          {conversation.sellerName}
        </ConversationItem>
      ))}

      {/* Display the messages */}
      {selectedConversation && (
        <MessagesContainer>
          {messages.map((message, index) => (
            <MessageItem key={index}>
              <Sender>
                {message.senderId === currentUser.id
                  ? "You: "
                  : message.senderName + ": "}
              </Sender>
              <div>{message.text}</div>
            </MessageItem>
          ))}
        </MessagesContainer>
      )}

      {/* Input field and send button */}
      <InputContainer>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </InputContainer>
    </ConversationContainer>
  );
}

export default Conversation;
