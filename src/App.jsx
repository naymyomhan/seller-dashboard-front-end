import { BrowserRouter } from "react-router-dom"
import MainRouter from "./router/MainRouter"
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter className="w-full">
      <MainRouter />
    </BrowserRouter>
  )
}

export default App
