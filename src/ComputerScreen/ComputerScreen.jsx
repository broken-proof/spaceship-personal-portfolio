import './ComputerScreen.css'
import { useState, useRef, useEffect } from 'react'
import monitorBorder from '../assets/monitorbackground.png'


function ComputerScreen() {

  //Allows access to the input element
  const inputRef = useRef(null);

  //Allows access to terminal div element
  const terminalRef = useRef()

  //Tracks history of console
  const [history, setHistory] = useState([{ type: 'output', content: "Welcome to shivam_os v1.0. Type 'help' to see available commands." }]);

  //Tracks current input
  const [input, setInput] = useState('');

  //Variable for final returned history
  let newHistory = [];

  //Function to handle user inputs for input field
  const handleInput = (element) => {
    if (element.key === "Enter") {
      const fixedInput = input.trim().toLowerCase();

      if (fixedInput === 'clear') {
        newHistory = [{ type: 'output', content: "Welcome to shivam_os v1.0. Type 'help' to see available commands." }]
      }

      else if (!fixedInput) {
        //Add to history always
        //Always add input to new History first
        for (const command of history) {
          newHistory.push(command)
        }
        newHistory.push({ type: 'command', content: fixedInput });

      }
      else {
        //Always add input to new History first
        for (const command of history) {
          newHistory.push(command)
        }
        newHistory.push({ type: 'command', content: fixedInput });

        //Process the non-empty input
        const output = processCommand(fixedInput);

        //If a proper output was generated, then add to the history
        if (output) {
          newHistory.push({ type: 'output', content: output })
        }
      }

      //Update history and input usestates
      setHistory(newHistory);
      setInput("");
    }

  }

  //Function to process commands and  return string
  function processCommand(input) {

    switch (input) {
      case 'help':
        return <div style={{ whiteSpace: "pre-wrap" }}>
          AVAILABLE COMMANDS:<br></br>
          help      -Display this message<br></br>
          whoami    -Brief Introduction and bio<br></br>
          resume    -Download my resume<br></br>
          clear     -Clear Screen
        </div>

      case 'whoami':
        return <div>
          Name: Shivam Murawala<br></br>
          Status: High School Senior at Woburn Collegiate Institute<br></br>
          Interests: Math Problemsolving, Business/DECA, Programming, Art, NBA/Basketball, Distance Running<br></br>

        </div>

      case 'resume':

        return <div>
          Fetching file: Shivam_Murawala_Highschool_Dev.pdf... <br></br>
          Initiating Download sequence... <br></br>
          <a rel="noopener noreferrer" target="_blank" href="./resume.pdf" style={{ color: "rgb(255, 255, 177)" }}>Click to Download</a>
        </div>

      default:
        return <div>
          Command Not Found {":("}
        </div>
    }
  }

  //Function to focus back on input when any part of the terminal is clicked
  function focusOnInput() {
    inputRef.current.focus();
  }

  //Helper function to give a delay before scrolling down
  function timer() {
    scroller = setTimeout(() => {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 50)
    return scroller;
  }

  //Scroll back into view whenever history changes
  useEffect(() => {
    //Let the broswer render new elements first then scroll.
    requestAnimationFrame(() => {
      clearTimeout(timer())
    }
    )
  }, [history])

  return (

    <div className="monitor">
      <div className="glass" style={{ borderImageSource: `url(${monitorBorder})` }}>

        <div className="crt">

          <div ref={terminalRef} className="terminal" onClick={focusOnInput}>

            {/* Render all lines within the history */}
            {
              history.map((line, index) => (
                <div key={index} >
                  {
                    line.type === 'command' ? (
                      // Output with prefix if it is a command
                      <span className='output_line'><span className='output_line'>guest@shivam-os:$ </span>{line.content} </span>
                    ) : (
                      // Output standard content if not a command
                      <span> {line.content}</span>
                    )
                  }
                </div>

              ))
            }

            {/* Render Active Input  */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className='output_line'>guest@shivam-os:$ </span>
              <input ref={inputRef} onKeyDown={handleInput} className="current_input" type="text" value={input} autoFocus spellCheck="false" autoComplete="off" onChange={(element) => setInput(element.target.value)}></input>
            </div>
          </div>

        </div>



        <div className="scan_effecta"></div>
      </div>


    </div>
  )
}

export default ComputerScreen;