import { useEffect } from "react";
import { useRoutes,useLocation, useNavigate } from "react-router-dom"
import router from "./router"
import {message} from "antd"

function ToLogin(){
  const navigator = useNavigate();
  useEffect(()=>{
    navigator("/login");
    message.warning("请先完成登录!");
  },[])
  return <div></div>
}

function ToHome(){
  const navigator = useNavigate();
  useEffect(()=>{
    message.warning("您已完成登录. 如需退出，请点击右上角注销按钮~");
    navigator("/");
  },[])
  return <div></div>
}

function PageGuadian(){
  const outlet = useRoutes(router);
  const location = useLocation();
  const app = sessionStorage.getItem("app");
  if (app && location.pathname === "/login"){
    return <ToHome></ToHome>
  }

  if (!app && location.pathname != "/login"){
    return <ToLogin></ToLogin>
  }

  return outlet
}


function App() {
  const outlet = useRoutes(router);
  return (
    <div className="App">
      <PageGuadian/>
    </div>
  )
}

export default App
