import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa";
import Meta from "../Components/meta";

const LeafletMap = dynamic(() => import("../Components/LeafletMap"), {
  ssr: false,
});

const UserIPInfo = dynamic(() => import("../Components/UserIPInfo"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [userIP, setUserIP] = useState("");
  const [currentIP, setCurrentIP] = useState("");

  useEffect(() => {
    async function getIP() {
      try {
        const apiCall = await fetch("https://api.ipify.org?format=json");
        const response = await apiCall.json();
        setUserIP(response.ip);
      } catch (error) {
        console.error(error);
      }
    }
    getIP();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentIP(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserIP(currentIP);
  };
  return (
    <>
      <Meta />
      <div className="App">
        <h1>Simple IP Address Tracker</h1>
        <h6>
          By{" "}
          <Link href={"https://novartus.github.io"}>
            <a style={{ color: "white" }} target="_blank">
              Novartus
            </a>
          </Link>
        </h6>
        <div className="form">
          <form
            action="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              placeholder="Search for any IP address"
            />
            <button type="submit">
              <FaSearch size={25} />
            </button>
          </form>
        </div>
        <UserIPInfo user_ip={userIP} />
        <LeafletMap user_ip={userIP} />
      </div>
    </>
  );
};

export default Home;
