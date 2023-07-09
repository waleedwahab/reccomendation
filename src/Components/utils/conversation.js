import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../Auth/firebase";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #f2f2f2; /* Change the background color to your desired color */
  color: #333333; /* Change the text color to your desired color */
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
const OptionsContainer = styled.div`
  position: relative;
  margin-left: 10px;
`;
const OptionsButton = styled.button`
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
const OptionsPanel = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const FileUploadInput = styled.input`
  display: none;
`;

function Conversation({ currentUser, sellingUser }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [file, setFile] = useState(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const storage = getStorage();
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
  
    if (newMessage.trim() === "" && !imageFile && !file) {
      return;
    }
  
    // Upload image file if available
    let imageURL = "";
    if (imageFile) {
      const storageRef = storage.ref(`images/${imageFile.name}`);
      await storageRef.put(imageFile);
      imageURL = await storageRef.getDownloadURL();
    }
  
    // Upload file if available
    let fileURL = "";
    if (file) {
      const storageRef = storage.ref(`files/${file.name}`);
      await storageRef.put(file);
      fileURL = await storageRef.getDownloadURL();
    }
  
    const message = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: newMessage,
      image: imageURL,
      file: fileURL,
      timestamp: serverTimestamp(),
    };
  
    try {
      await addDoc(
        collection(db, `users/${selectedConversation.receiverId}/messages`),
        message
      );
      setNewMessage("");
      setImageFile(null);
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const toggleOptionsPanel = () => {
    setOptionsOpen((prevState) => !prevState);
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
              {message.image && <img src={message.image} alt="Message Image" />}
              {message.file && (
                <a href={message.file} target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
              )}
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
         <OptionsContainer>
          <OptionsButton onClick={toggleOptionsPanel}>
            Options
          </OptionsButton>
          <OptionsPanel open={optionsOpen}>
            <Option>
              <label htmlFor="image-upload">Upload Image</label>
              <ImageUploadInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Option>
            <Option>
              <label htmlFor="file-upload">Upload File</label>
              <FileUploadInput
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={handleFileUpload}
              />
            </Option>
          </OptionsPanel>
        </OptionsContainer>
        <Button onClick={handleSendMessage}>Send</Button>
      </InputContainer>
    </ConversationContainer>
  );
}

export default Conversation;
