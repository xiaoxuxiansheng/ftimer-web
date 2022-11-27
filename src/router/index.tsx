import Login from "@/views/login"
import Timers from "@/views/timer/list"
import TimerDetail from "@/views/timer/detail"
import Home from "@/views/home"

// const Timers = lazy(()=>import("@/views/timer/list"))
// const TimerDetail = lazy(()=>import("@/views/timer/detail"))
// const TimerInfo = lazy(()=>import("@/views/timer/info"))
// const TimerHistory = lazy(()=>import("@/views/timer/history"))

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

            // {
            //     path:"/timer/detail",
            //     element:withLoadingComponent(<TimerDetail></TimerDetail>),
            // },
            // {
            //     path:"/timer/info",
            //     element:withLoadingComponent(<TimerInfo></TimerInfo>),
            // },
            // {
            //     path:"/timer/history",
            //     element:withLoadingComponent(<TimerHistory></TimerHistory>),
            // },
            // {
        ]
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
]
export default routes