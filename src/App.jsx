import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef()


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])
  // This fnuses usecallback hook so that it only refreshes fn when the specfic things in that array change
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) {
      str += "1234567890";
    }
    if (charAllow) {
      str += "!@#$%^&*()_+-=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    console.log(numAllow,charAllow)
  }, [length, numAllow, charAllow]);

  // Using password generator with useEffect hook
  useEffect(()=>{passwordGenerator()}, [length,numAllow,charAllow,passwordGenerator])

  return (
      <div
        className="w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-3 my-8 
    text-orange-500 bg-gray-800"
      >
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref = {passwordRef}
          />

          <button className="bg-blue-700 text-white px-3 p-0.5 shrink-0 outline-none"
          onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>

        <div className="flex test-sm gap-x-1">
          <div className="flex items-center gap-x-1"></div>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
            <div className="flex test-sm gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={numAllow}
              onChange={()=>{setNumAllow((prev)=>!prev)}}
              />
              <label>Numbers</label>

              <input 
              type="checkbox"
              defaultChecked={charAllow}
              onChange={()=>{setCharAllow((prev)=>!prev)}}
              />
              <label>Characters</label>

            </div>
        </div>
      </div>
  );
}

export default App;
