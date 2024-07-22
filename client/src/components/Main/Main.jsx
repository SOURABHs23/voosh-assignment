import React from "react";
import BoardComponent from "./BoardComponent";
import Board from "./Board";
import { Route, Routes, Navigate } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<BoardComponent />} />
        <Route path="/boards/:id" element={<Board />} />

        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </main>
  );
};

export default Main;
