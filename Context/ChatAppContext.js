"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

//internal import
import { CheckIfWalletConnected, connectWallet, connectingWithConstract, converTime } from '../Utils/apiFeature';

export const ChatAppConnect = React.createContext({});

export const ChatAppProvider = ({children}) => {

    //USESATE
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    //FETCH DATA TIME OR PAGE LOAD
    const fetchData = async()=>{
        try {
            //GET CONTRACT
            const contract = await connectingWithConstract();
            console.log("CONTRACT: "+contract);
            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //GET USERNAME
            // const userName = await contract.getUserName(connectAccount);
            // setUserName(userName);
            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //GET ALL APP USER LIST
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            setError("Please Install and Connect Your Wallet");
            console.log(error);
        }
    };
    useEffect(()=> {
        fetchData();
    }, []);

    //READ MESSAGE
    const readMessage = async(friendAddress)=>{
        try {
            const contract = await connectingWithConstract();
            const read = contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently You Have no Message");
        }
    }

    //CREATE ACCOUNT
    const createAccount = async({ name, accountAddress })=>{
        try {
            // if (name || accountAddress) 
            //     return setError("Name And Account Address, cannot be emmpty");

            const contract = await connectingWithConstract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account! Please reload browse")
        }
    }

    //ADD FRIENDS
    const addFriends = async({ name, accountAddress})=>{
        try {
            if(name || accountAddress)
                return setError("Please provide data");

            const contract = await connectingWithConstract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friends, try again");
        }
    }

    //SEND MESSAGE TO FRIEND
    const sendMessage = async({msg, address})=>{
        try {
            if (msg || address) return setError("Please Type your Message");

            const contract = await connectingWithConstract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload or try send again");
        }
    }

    //READ INFO
    const readUser = async({userAddress})=>{
        const contract = await connectingWithConstract();
        const userName = await contract.getUserName(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }

    return(
        <ChatAppConnect.Provider 
            value={{ 
                readMessage, 
                createAccount, 
                addFriends, 
                sendMessage, 
                readUser,
                CheckIfWalletConnected,
                connectWallet,
                account,
                userName,
                friendLists,
                friendMsg,
                loading,
                userLists,
                error,
                currentUserName,
                currentUserAddress,
             }}
        >
            {children}
        </ChatAppConnect.Provider>
    )
};