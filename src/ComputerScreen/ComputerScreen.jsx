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

  //Variable for screen color theme
  const [theme, setTheme] = useState("amber")

  //Function to process commands and  return string
  function processCommand(input) {

    //Handle differently for multi-word commands
    if (input.includes(" ")) {
      //Fix input
      input = input.replace(/\s+/g, " ").trim().toLowerCase();

      let wordList = input.split(" ");

      if (wordList[0] === "theme") {
        switch (wordList[1]) {

          case "cyberpunk":
            setTheme("cyberpunk");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'cyberpunk'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "phosphor":
            setTheme("phosphor");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'phosphor'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "amber":
            setTheme("amber");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'amber'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "synthwave":
            setTheme("synthwave");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'synthwave'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )


          default:
            return (<div style={{ whiteSpace: "pre-wrap" }}>

              theme: '{wordList[1]}' is not a valid theme. <br></br>
              Try 'theme' for a list of available palettes.
            </div>)

        }

      }

      else {
        return (<div>
          Command Not Found {":("}
        </div>)
      }
    }

    else {
      switch (input) {
        case 'help':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            AVAILABLE COMMANDS:<br></br>
            help      -Display this message<br></br>
            whoami    -Brief Introduction and bio<br></br>
            resume    -Download my resume<br></br>
            contact   -Get Contact Info <br></br>
            theme     -Modify Terminal Color Theme <br></br>
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
            {"[ OK ]"} Fetching file: Shivam_Murawala_Highschool_Dev.pdf... <br></br>
            {"[ OK ]"} Initiating Download sequence... <br></br>
            <a rel="noopener noreferrer" target="_blank" href="./resume.pdf" style={{ color: "inherit" }}>Click to Download</a>
          </div>

        case 'contact':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            <br></br>
            {">"} Initiating handshake configurations... <br></br>
            Email:    <a style={{ color: "inherit" }} target="_blank" href='mailto:shivammurawala2810@gmail.com'>shivammurawala2810@gmail.com</a><br></br>
            Github:   <a style={{ color: "inherit" }} target="_blank" href='https://github.com/broken-proof'>github.com/broken-proof</a><br></br>
            LinkedIn: <a style={{ color: "inherit" }} target="_blank" href='https://www.linkedin.com/in/shivam-murawala-b9141829b/'>linkedin.com/in/shivam-murawala-b9141829b/</a>
          </div>

        case 'theme':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            {"<<<"} SYSTEM DISPLAY MANAGER {">>>"} <br></br>
            Current Theme: [{theme}]<br></br>
            Available Themes:<br></br>
            <ul>
              <li>amber     - Monochrome Yellowish Orange</li>
              <li>phosphor  - Classic P1 Green CRT</li>
              <li>cyberpunk - Electric Cyan</li>
              <li>synthwave - Neon Purple</li>
            </ul>
            <br></br>
            Usage: theme {"<color_name>"} <br></br>
            Example: theme synthwave


          </div>

        default:
          return <div>
            Command Not Found {":("}
          </div>
      }
    }
  }

  //Function to handle user inputs for input field
  function handleInput(element) {
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

  //Function to focus back on input when any part of the terminal is clicked
  function focusOnInput() {
    inputRef.current.focus();
  }

  //Helper function to give a delay before scrolling down
  function timer() {
    let scroller = setTimeout(() => {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 50)
    return scroller;
  }

  //Scroll back into view whenever history changes
  useEffect(() => {
    requestAnimationFrame(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    })
  }, [history])

  return (

    <div className="monitor">
      <div data-theme={theme} className="glass" style={{ borderImageSource: `url(${monitorBorder})` }}>

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