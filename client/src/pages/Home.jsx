import { Link } from 'react-router-dom'

function Home() {
    return (
        <main className="home">

            <section className="hero">
                <div className="hero-content">

                    <p className="hero-label">WELCOME TO MY PORTFOLIO</p>

                    <h1>
                        Hi, I'm <span>Hesham Aryan.</span>
                    </h1>

                    <h2>
                        Software Engineering Student & Developer
                    </h2>

                    <p className="hero-description">
                        I am passionate about building modern, useful, and user-friendly
                        digital experiences. My goal is to continuously grow as a developer
                        while turning creative ideas into real-world solutions.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/projects" className="primary-btn">
                            View My Work
                        </Link>

                        <Link to="/about" className="secondary-btn">
                            About Me
                        </Link>
                    </div>

                    <div className="tech-stack">
                        <span>React</span>
                        <span>JavaScript</span>
                        <span>C#</span>
                        <span>Python</span>
                        <span>HTML & CSS</span>
                    </div>

                </div>

                <div className="hero-visual">
                    <div className="code-card">

                        <div className="code-card-top">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className="code-content">
                            <p><span className="purple">const</span> developer = {'{'}</p>
                            <p>&nbsp;&nbsp;name: <span className="blue">"Hesham Aryan"</span>,</p>
                            <p>&nbsp;&nbsp;passion: <span className="blue">"Building"</span>,</p>
                            <p>&nbsp;&nbsp;mindset: <span className="blue">"Always Learning"</span>,</p>
                            <p>&nbsp;&nbsp;coffee: <span className="purple">true</span></p>
                            <p>{'}'}</p>
                        </div>

                    </div>
                </div>

            </section>

        </main>
    )
}

export default Home