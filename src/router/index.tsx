import {Navigate} from "react-router-dom"
import Login from "@/views/login"
import Timers from "@/views/timer/list"
import TimerDetail from "@/views/timer/detail"
import TimerMonitor from "@/views/timer/monitor"
import TimerTest from "@/views/timer/test"
import TimerDoc from "@/views/timer/doc"
import Home from "@/views/home"

const routes = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/timers",
                element: <Timers />
            },
            {
                path: "/timer/detail",
                element: <TimerDetail></TimerDetail>,
            },
            {
                path:"/timer/monitor",
                element:<TimerMonitor></TimerMonitor>
            },
            {
                path:"/timer/doc",
                element:<TimerDoc></TimerDoc>
            },
            {
                path:"/timer/test",
                element:<TimerTest></TimerTest>
            },
        ]
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "*",
        element: <Navigate to="/"/>,
    },
]
export default routes