import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import "reset-css"
import "./assets/styles/global.scss"
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
