import { useCallback, useRef, useState } from "react";
import "./App.css";
import { toast, ToastContainer, Bounce } from "react-toastify";

const numbers = "0123456789";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!@#$%^&*(){}[]-_+=/?><|";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [IncludeUpperCase, setUpperCase] = useState(false);
  const [includeLowerCase, setLowerCase] = useState(false);
  const [IncludeNumbers, setNumbers] = useState(false);
  const [IncludeSymbols, setSymbols] = useState(false);
  const passwordRef = useRef(null);
  const cpyMessage = "Password Copied Successfully!";

  // Callback function to handle the password generation
  const handleGeneratePassword = useCallback(() => {
    //Initailizing an empty character list
    let characterList = "";
    //If no option is selected show an error message
    if(!includeLowerCase && !IncludeNumbers && !IncludeUpperCase && !IncludeSymbols){
      notify('Plese select any dependencies shown below.', true)
      return
    }
    //Adding selected dependencies/conditions
    if (IncludeUpperCase) {
      characterList += upperCase;
    }
    if (includeLowerCase) {
      characterList += lowerCase;
    }
    if (IncludeNumbers) {
      characterList += numbers;
    }
    if (IncludeSymbols) {
      characterList += symbols;
    }

    //Password Generation and State update
    setPassword(createPassword(characterList));
  }, [
    IncludeNumbers,
    IncludeUpperCase,
    IncludeSymbols,
    includeLowerCase,
    passwordLength,
  ]);

  //Function to generate password of the desired length and randomness
  const createPassword = useCallback(
    (characterList) => {
      let password = "";
      const characterListLength = characterList.length;

      //Randomly selection characters from the list to form the password
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.floor(Math.random() * characterListLength);
        password += characterList.charAt(characterIndex);
      }

      return password;
    },
    [passwordLength]
  );

  const notify = useCallback((message, hasError=false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }else{
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

  }, []);

  //Callback function to copy the generated password to clipboard using useRef
  const copyToClipboard = useCallback(() => {
    //Select the text in the input box using useRef
    passwordRef.current?.select();
    //Copy the password
    navigator.clipboard.writeText(password);
    //Display nofication
    notify(cpyMessage);
  }, [password, notify]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0086c0] to-[#00863e] flex justify-center items-center">
      <div className="w-80">
        <div className="bg-gradient-to-b from-[#c05c00] to-[#72b600] rounded-lg shadow-lg p-5">
          <h2 className="text-center text-white mb-5 font-bold">
            Password Generator
          </h2>
          <div className="bg-[#552900] rounded-md relative p-3 flex text-white h-12 mb-4">
            <input
              type="text"
              ref={passwordRef}
              readOnly
              value={password}
              className="w-full bg-transparent text-white outline-none cursor-default"
            />
            {/* <h3>{password}</h3> */}
            <button
              onClick={copyToClipboard}
              className="absolute bg-[#6b00aa] rounded z-10 text-white border-none top-1 text-center right-1 h-10 p-2"
            >
              <i className="ri-clipboard-line text-lg"></i>
            </button>
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="Password length"> Password Length</label>
            <input
              type="number"
              className="text-black w-16"
              name="Password Length"
              max="25"
              min="5"
              defaultValue={passwordLength}
              id="password-length"
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="Include Uppercase Letters">
              {" "}
              Include Uppercase Letters
            </label>
            <input
              type="checkbox"
              checked={IncludeUpperCase}
              onChange={(e) => {
                setUpperCase(e.target.checked);
              }}
              className="text-black w-4"
              name="Include Uppercase Letters"
              id="include-uppercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="Include Lowercase Letters">
              {" "}
              Include Lowercase Letters
            </label>
            <input
              type="checkbox"
              checked={includeLowerCase}
              onChange={(e) => {
                setLowerCase(e.target.checked);
              }}
              className="text-black w-4"
              name="Include Lowercase Letters"
              id="include-lowercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="Include Numbers"> Include Numbers</label>
            <input
              type="checkbox"
              checked={IncludeNumbers}
              onChange={(e) => {
                setNumbers(e.target.checked);
              }}
              className="text-black w-4"
              name="Include Numbers"
              id="include-numbers"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="Include Symbols"> Include Symbols</label>
            <input
              type="checkbox"
              checked={IncludeSymbols}
              onChange={(e) => {
                setSymbols(e.target.checked);
              }}
              className="text-black w-4"
              name="Include Symbols"
              id="include-symbols"
            />
          </div>

          <button
            onClick={handleGeneratePassword}
            className="bg-gradient-to-t from-[#9c6800] to-[#b600a9] rounded shadow-md w-full p-2 text-lg text-center text-white"
          >
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
