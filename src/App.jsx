import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //Ref hook

  const passwordRef =useRef(null)

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#._!,?<>:;";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center">
        Password Generator
        <div className="flex shadow rounded-lg overflow-hidden mb-5 p-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full rounded-l-lg py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button 
          onClick={copyPassword}
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 rounded-r-lg">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 pb-5 pl-7">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />{" "}
            length : {length}
          </div>

          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
