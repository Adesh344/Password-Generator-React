import { useState, useCallback , useEffect , useRef } from 'react'



function App() {
  
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)

  const [password , setPassword] = useState("")

  //use ref 
  //

  const passwordRef = useRef(null)


  const passwordGeneroator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+="!@#$%^&*()+{}[]:;<>/?"

    for(let i = 1 ; i <= length ; i++){

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() =>{
    passwordGeneroator()
  } , [length,numberAllowed,charAllowed,passwordGeneroator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-500 '>
      <h1 className='text-center my-3'>Password Generator</h1>
      <div className='className=" flex shadow overflaw-hidden mb-4 rounded-lg"'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3 '
        placeholder='password'
        readOnly
        ref={passwordRef}

        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>

      </div>

      <div className='flex text-sm gap-x-2 text-orange-500'>
        <div className='flex items-center gap-x-1'>
          
          <input 
          type="range" 
          min={6}
          max={16}
          value={length}
          className='cursor-pointer'

          onChange={(e)=>{setLength(e.target.value)}}
          
          />
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev) => ! prev)
          }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked ={charAllowed}
          id='characterInput'
          onChange={()=>{
            setCharAllowed((prev) => ! prev)
          }}
          />
          <label htmlFor="numberInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
