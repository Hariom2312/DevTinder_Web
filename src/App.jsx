import {  useState } from 'react';
import './App.css';
import{BrowserRouter , Routes , Route} from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <BrowserRouter basename='/'>
        <Routes>
           <Route path='/' element={<Body/>}>
             {/* Children of Body */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/Profile' element={<Profile/>}/>
           </Route>
        </Routes>
     </BrowserRouter>
   </>
  )
}

export default App
