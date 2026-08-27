import './ComputerScreen.css'
import { useState } from 'react'
import monitorBorder from '../assets/monitorbackground.png'
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Resume from './Resume';
import Contact from './Contact';

function ComputerScreen() {

  const [topic, setTopic] = useState('default');

  const goHomePage = () => setTopic('default');

  return (

    <div className="monitor">
      <div className="glass" style={{ borderImageSource: `url(${monitorBorder})` }}>

        <div className="crt">

          {topic === 'default' && (<div className="mainMenu">

            <h1 style={{ paddingBottom: "1rem" }}>My Portfolio</h1>
            <nav className="topic_navigation">
              <button onClick={() => setTopic("about")}>&gt; ABOUT</button>
              <button onClick={() => setTopic("projects")}>&gt;  PROJECTS</button>
              <button onClick={() => setTopic("experience")}>&gt; EXPERIENCE</button>
              <button onClick={() => setTopic("resume")}>&gt; RESUME</button>
              <button onClick={() => setTopic("contact")}>&gt; CONTACT</button>
            </nav>
          </div>)}

          {topic === 'about' && <About onBack={goHomePage} />}
          {topic === 'projects' && <Projects onBack={goHomePage} />}
          {topic === 'experience' && <Experience onBack={goHomePage} />}
          {topic === 'resume' && <Resume onBack={goHomePage} />}
          {topic === 'contact' && <Contact onBack={goHomePage} />}

        </div>



        <div className="scan_effectb"></div>
        <div className="scan_effecta"></div>
      </div>


    </div>
  )
}

export default ComputerScreen;