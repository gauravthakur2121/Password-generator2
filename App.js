import React, {useCallback, useState , useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [characterAllowed , setCharacterAllowed] = useState(false);
  const [password , setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "@#$%^&*()?/<>!`+-"

    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length , numberAllowed , characterAllowed , setPassword])

  useEffect(()=>{
    passwordGenerator()


  },[length , numberAllowed , characterAllowed , passwordGenerator])

  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)

  } , [password])
  // useref hook

  const passwordRef = useRef(null)

  return (
    <div>
      <h2 className='text-center text-white mt-3 ' >Password-generator</h2>

      <div className='div1'>
        <input type='text' value={password} placeholder='password' className='text mt-2' ref={passwordRef}></input>
        <button type='btn' className=' btn btn-primary'  onClick={copytoclipboard}>Copy</button>

        <br/>
        <input type='range' className='range' min={6} max={50} value={length} onChange={(e)=>{setLength(e.target.value)}}></input>
        <lable className='text-white'>Length: ({length})</lable>

      <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' className='checknumber' onChange={()=>{
        setNumberAllowed((prev)=> !prev)
      }}
    
      />
      <label htmlFor='numberInput' className='text-white mx-2'>Numbers</label>

      <input type='checkbox' defaultChecked={characterAllowed} id='characterInput' className='checknumber' onChange={()=>{
        setCharacterAllowed((prev)=> !prev)
      }}
    
      />
      <label htmlFor='characterInput' className='text-white mx-2'>Characters</label>




      </div>
    
    </div>
  );
}

export default App;
