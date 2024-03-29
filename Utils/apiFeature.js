import { ethers } from "ethers";
//const ethers = require("ethers");
import Web3Modal from "web3modal";
//const Web3Modal = require("web3modal");

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async () => {
    try {
       if(!window.ethereum) return console.log("Install MateMask");

       const accounts = await window.ethereum.request({
        method: "eth_accounts"
       });

       const firstAccount = accounts[0];
       return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

export const connectWallet = async () => {
    try {
        if(!window.ethereum) return console.log("Install MateMask");

       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
       });
       const firstAccount = accounts[0];
       return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

const fetchContract = (signerOrProvider)=> new ethers.Contract( ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithConstract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract( ChatAppAddress, ChatAppABI, signer); 
        return contract;
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

export const converTime = (time)=>{
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + "/" + newTime.getMinutes() + "/" + newTime.getSeconds() +
    "  Date:" + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

    return realTime;
}