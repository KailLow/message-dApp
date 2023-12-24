import React, { useState, useContext } from "react";
import Style from "./Model.module.css";
import Image from "next/image";

import images from "../../assets/index";
import { ChatAppConnect } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model = ({
  openBox,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  address,
}) => {
  //USE STATE
  const [name, setName] = useState("");
  const [accountAdddress, setAccountAddress] = useState("");

  const context = useContext(ChatAppConnect);
  const { loading } = context ?? {};
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="user" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p className={Style.info}>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="username"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.account}
                  alt="address"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder={address || "Enter Address..."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => functionName({ name, accountAdddress })}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>

                <button onClick={() => openBox(false)}>
                  {""}
                  <Image src={images.close} alt="send" width={30} height={30} />
                  {""}
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
