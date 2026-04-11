"use client";
import { useState } from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Calendar from "./components/Calendar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState("");
  const toggleSideNav = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setVisibility("blur-sm zIndexBottom");
    } else {
      setTimeout(() => {
        setVisibility("");
      }, 300);
    }
  }

  let date = new Date().toDateString();

  const greetings = new Date().getHours() < 12 && new Date().getHours() < 18 ? "Good morning" : new Date().getHours() > 12 && new Date().getHours() < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="dashboard">
      <Header toggleSideNav={toggleSideNav} />
      <SideNav isOpen={isOpen} toggleSideNav={toggleSideNav} />
      <div className={`main-content ${visibility}`}>
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-3xl mx-4 ">{greetings} Taelo</h1>
          <div>
            <div className="date mx-4">
              {date}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="card mx-2 mt-10 p-4">
            <p>Study Streak</p>
            <h2 className="text-2xl">0 days</h2>
            <p>Personal Best: 18 days</p>
          </div>
          <div className="card mx-2 mt-10 p-4">
            <p>Hours This Week</p>
            <h2 className="text-2xl">14.5 h</h2>
            <p>Goal: 40 h</p>
          </div>
          <div className="card mx-2 mt-10 p-4">
            <p>Tasks Done</p>
            <h2 className="text-2xl">1 / 4</h2>
            <p>Keep Going</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-gray-700 mx-4 mt-10">Now & Next</h2>
          <div className="date m-4 flex  items-center  relative">
            <div className="now mr-4">
              NOW
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Data Structures & Algorithms
              </h3>
              <div>
                <p className="text-gray-500">
                  2:00 PM - 4:00 PM <br />
                  47 minutes remaining
                </p>
              </div>
            </div>
            <div className="go">
              Go to module <i className="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div className="card m-4">
          <h2 className="text-2xl p-4">Week At A Glance</h2>
          <Calendar />
        </div>
        <div className="card m-4">
          <h2 className="text-2xl p-4">Module Progress</h2>
          <Calendar />
        </div>
        <div className="card m-4">
          <h2 className="text-2xl p-4">UpComing Sessions</h2>
          <Calendar />
        </div>
        <div className="card m-4">
          <h2 className="text-2xl p-4">Study Streak</h2>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
