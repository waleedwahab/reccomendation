
import React, { useState, useEffect } from "react";
import UserNavbar from "../Navbar/UserNavbar";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
  getDocs,
  collectionGroup

} from "firebase/firestore";
import { db, Storage } from "../../Auth/firebase";
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Footer from "../Navbar/Footer"
import "./Conversation.css"
// Styled Components
const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 87vh;
  margin-left: 0px;
  
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
  width: 100%;
  min-width: 1170px;
  
  margin: 20px auto;
  padding: 20px;
  margin-left: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;


const Input = styled.input`
  padding: 8px;
  border-radius: 20px;
  border: none;
  outline: none;
  width: 100%;
  background-color: #ffffff;
  color: #333333;
`;

const MessageItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#cfeeff" : "#f5f5f5"};
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? "flex-end" : "flex-start")};
  max-width: 80%;
  margin-bottom: 10px;
`;

const Sender = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${({ isCurrentUser }) => (isCurrentUser ? "#333333" : "#666666")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f5f5f5;
`;


const Button = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 20px;
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

const ConversationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isCurrentUser }) => (isCurrentUser ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;
const OptionsButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: max-content;

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
  const[musers, setUsers] = useState([]);
  const [currentChatUser,  setCurrentChatUser] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);
const loginuserid = (user.id);

console.log(musers);

  useEffect(() => {
    const getUsersExceptCurrent = async (loginuserid) => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("id", "!=", loginuserid));

      try {
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data());
        console.log("Users:", users);
        setUsers(users);
        // Do something with the users data
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    if (currentUser) {
      getUsersExceptCurrent(currentUser.id);
    }
  }, [currentUser]);

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
      gettingdata();
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

  const handleUser = (user) => {
    setCurrentChatUser(user);
    setSelectedConversation({
      senderId: currentUser.id,
      receiverId: user.id,
    });
  };

 

  const gettingdata = async () => {
    const urlParam = new URLSearchParams(location.search);
    const senderid = urlParam.get("senderId");
    const currentUserId = currentUser.id;

    try {
      const querySnapshot = await getDocs(
        collectionGroup(db, "messages")
          .where("participants", "array-contains", senderid)
          .where("participants", "array-contains", currentUserId)
          .orderBy("timestamp", "desc")
      );

      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


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
      const storageRef = ref(Storage, `images/${imageFile.name}`);
      const blob = new Blob([imageFile], { type: imageFile.type });
      await uploadBytes(storageRef, blob);
      imageURL = await getDownloadURL(storageRef);
    }
  
    // Upload file if available
    let fileURL = "";
    if (file) {
      const storageRef = ref(Storage, `files/${file.name}`);
      const blob = new Blob([file], { type: file.type });
      await uploadBytes(storageRef, blob);
      fileURL = await getDownloadURL(storageRef);
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
    setOptionsOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setOptionsOpen(false);
  };
  const toggleOptionsPanel = () => {
    setOptionsOpen((prevState) => !prevState);
  };


  return (
    <>
    <UserNavbar/>
    <div className=' mainContactContainer'>


    <div>
    <div style = {{width:"20pc"}}>
        <input  className='searchforcontact' type = "search" placeholder='Search your friends'></input>
    </div>

   
      
    <div className='usersDetailContainer'>
  
    {musers.map ((user, index) =>(
   <div  className= "userContainer"   key= {index} onClick = {(e)=>handleUser(user)} >
 


          <img src ="user.imgURL"  className = "Chatuserimage" alt = ""></img>  
          <div  style={{marginLeft:"10px"}}><p style = {{color:"black", textAlign:"start", marginTop:"0px", fontSize:"15px"}}>{user.name}</p>
          <p   style = {{color:"black", textAlign:"start", marginTop:"-10px", fontSize:"14px"}}> open your mesage</p>
          </div>
</div>     )) }

  
        
 

    </div>
</div>
    <ConversationContainer>
    <div className="selectedUserContainer">
    <span><img src = "currentChatUser.imgURL" alt = "no image"></img>   <h3> {currentChatUser.name}</h3></span> 
      </div>
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
  <MessageItem
    key={index}
    isCurrentUser={message.senderId === currentUser.id}
  >
    <Sender>
      {message.senderId === currentUser.id ? "You: " : message.senderName + ": "}
    </Sender>
    <div>{message?.text}</div>
    {message.image.length > 10 && (
      <img
        src={message.image}
        style={{ width: "100px", height: "100px" }}
        alt="Message Image"
      />
    )}
    {message.file.length > 10 && (
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
          style= {{"border":"1px solid blue" , "width":"500px"}}
          classname = "inpt11"
           
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
         <OptionsContainer>
          <OptionsButton onClick={toggleOptionsPanel}>
            Options {(imageFile!==null || file!==null)?<span style={{backgroundColor: "red", padding: "3px", borderRadius: "50%", fontSize:"x-small"}}>1</span>:<></>}
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
    </div>
    <Footer/>

    </>
  );
}

export default Conversation;