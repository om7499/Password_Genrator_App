import { useState ,useEffect,useRef} from 'react'

import './App.css'
import { useCallback } from 'react'

// define all variables
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  // uesRef hook
  const passwordref = useRef(null)

  // it is use for genrate a password
  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "123456789"
    if(charAllowed) str += "~!@#$%^&*()_+-[]{}`"

    // genrate random number
    for(let i=1;i<=length;i++){
      let char = (Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    // provide this password 
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])
   
  // copy the password
  const copyPasswordToClipbord = useCallback(()=>{
    passwordref.current?.select()
    passwordref.current.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])


  // tish hook is use for run the pass genrator
  // first run this code on page
  useEffect(()=>{
    passwordGenrator()
  },
  [length,numberAllowed,charAllowed,passwordGenrator])

  return (
    <>
    <div className='flex justify-center items-center w-full h-screen'>
     <div className='w-full max-w-md mx-auto shadow-lg
     rounded-lg px-4 my-8 py-3 text-orange-600 text-center bg-gray-600'>
      <h1 className=' text-center my-2 py-2 text-green-500 text-xl font-bold'> Password Genrator</h1>
      <div className='flex shadow-sm rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-2'
          placeholder='password'
          readOnly
          ref={passwordref} />
          <button onClick={copyPasswordToClipbord}
          className='outline-none bg-blue-700 text-white px-3 hover:bg-green-600'>Copy</button>
      </div>
        <div className='flex text-sm gap-x-2'>
          {/* range setter */}
            <div className='flex items-center gap-x-1 mb-2'>
               <input type="range" min={8}max={100} value={length}
               className='cursor-pointer' 
               onChange={(e)=>{setLength(e.target.value)}}/>
               <label>Length : {length}</label>
            </div>
            
            {/* checkbox for number */}
            <div className='flex items-center gap-x-1 mb-2'>
               <input type="checkbox" defaultChecked = {numberAllowed}
               id='numberInput' 
               onChange={()=>{
                setNumberAllowed((prev) => !prev);
               }}/>
               <label htmlFor="numberInput">Numbers</label>
            </div>
            
            {/* checkbox for character */}
            <div className='flex items-center gap-x-1 mb-2'>
               <input type="checkbox" defaultChecked = {charAllowed}
               id='CaracterInput' 
               onChange={()=>{
                setNumberAllowed((prev) => !prev);
               }}/>
               <label htmlFor="CharacterInput">Characters</label>
            </div>
        </div>
     </div>
     </div>
    </>
  )
}

export default App
