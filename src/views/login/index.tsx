import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Input, Space, Button, message } from "antd"
import styles from "./login.module.scss"
import initLoginBg from "./init.ts";
import { message as Message } from 'antd'
import './login.less'

const View = () => {
    const navigator = useNavigate();
    // 加载完组件后执行
    useEffect(() => {
        initLoginBg();
        window.onresize = function () { initLoginBg() };
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    const goLogin = () => {
        if (username == 'test' && password == 'test'){
            sessionStorage.setItem("app", username);
            navigator("/");
            Message.success("登录成功~");
            return
        }

        if (username == 'guest' && password == 'guest') {
            sessionStorage.setItem("app", username);
            navigator("/");
            Message.success("登录成功~");
            return
        }

        if (username == 'admin' && password == 'admin') {
            sessionStorage.setItem("app", username);
            navigator("/");
            Message.success("登录成功~");
            return
        }

        Message.error("用户名或密码错误!");
    }

    return (
        <div className={styles.loginPage}>
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            <div className={styles.loginBox + " loginbox"}>
                {/**标题部分*/}
                <div className={styles.title}>
                    <h1>小徐先生&nbsp;·&nbsp;XTimer 后台系统</h1>
                    <p>祝您开心每一天~</p>
                </div>
                {/**表单部分*/}
                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: "flex" }}>
                        <Input placeholder="用户名" onChange={usernameChange}></Input>
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        <Button type="primary" className="loginButton" block onClick={goLogin}> 登录 </Button>
                    </Space>
                </div>

            </div>
        </div>
    )
};

export default View