import {Toaster} from 'react-hot-toast'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChatLayout from "./pages/ChatLayout"
import LoginPage from "./pages/LoginPage"
import SignUp from "./pages/SignUp"
import AccountPage from "./pages/AccountPage"
import ChatSide from './pages/ChatSide'
import Applayout from './pages/Applayout'

export default function App() {
const route = createBrowserRouter([{
  element:<Applayout/>,children:[
    {path:'/setting',element:<AccountPage/>},
    {path:'/',element:<ChatLayout/>}
  ]
},
{
  path:'/signIn',element:<LoginPage/>
},
{path:'/signUp',element:<SignUp/>}

])
  return (
  <>
    <RouterProvider router={route}/>
    <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'gray',
            color: 'white',
          },
        }}
      />
    </>
  )
}
