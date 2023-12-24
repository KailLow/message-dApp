"use client"
import React, { useEffect, useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Style from './Navbar.module.css'

//internal import
import { ChatAppConnect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";

const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser"
    },
    {
      menu: "CHAT",
      link: "/"
    },
    {
      menu: "CONTACT",
      link: "/"
    },
    {
      menu: "SETTING",
      link: "/"
    },
    {
      menu: "FAQS",
      link: "/"
    },
    {
      menu: "TERM OF USE",
      link: "/"
    },
  ]

  //USE STATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppConnect);

  //const context = useContext(ChatAppConnect);
  //const { account, userName, connectWallet, createAccount, error } = context ?? {};
  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt='logo' width={50} height={50} />
        </div>
        <div className={Style.Navbar_box_right}>
          <div className={Style.Navbar_box_right_menu}>
            {menuItems.map((el, i)=> (
              <div onClick={()=> setActive(i + 1)} key={1 + 1} className={`${Style.Navbar_box_right_menu_item} ${active==i + 1 ? Style.active_btn : ""}`}>
                <Link 
                  className={Style.Navbar_box_right_menu_item_link} href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* CONNECT WALLET */}
          <div className={Style.Navbar_box_right_connect}>
            {account == "" ? (
              <button onClick={()=> connectWallet()}>
                {""}
                <span>connect wallet</span>
              </button>
            ) : (
              <button onClick={()=> setOpenModel(true)}>
                {""}
                <Image src={userName ? images.accountName : images.create2 }
                  alt='Account image'
                  width={20}
                  height={20}
                />
                {''}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div className={Style.Navbar_box_right_open}
            onClick={()=> setOpen(true)}
          >
            <Image src={images.open} alt='open' width={30} height={30} />
          </div>
        </div>
      </div>

      {openModel && (
        <div className={Style.modelBox}>
          <Model openBox={setOpenModel}
            title="WELCOME TO"
            head="CHATT"
            info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            smallInfo="Kindley select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  )
}

export default Navbar