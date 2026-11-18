function Education() {
    return (
        <main className="education-page">
            <section className="education-container">

                <div className="page-heading">
                    <p className="section-label">MY JOURNEY</p>

                    <h1>
                        Education <span>& Growth.</span>
                    </h1>

                    <p>
                        My academic journey and the technical skills I have developed
                        while preparing for a career in software development.
                    </p>
                </div>

                <div className="education-layout">

                    <div className="education-card">
                        <div className="education-year">2024 — Present</div>

                        <div className="education-icon">🎓</div>

                        <div className="education-content">
                            <p className="education-type">COLLEGE EDUCATION</p>

                            <h2>Software Engineering</h2>

                            <h3>Centennial College</h3>

                            <p>
                                Studying software development with hands-on experience in
                                programming, web application development, databases, and
                                software engineering concepts.
                            </p>

                            <div className="education-tags">
                                <span>React</span>
                                <span>JavaScript</span>
                                <span>C#</span>
                                <span>Python</span>
                                <span>HTML & CSS</span>
                            </div>
                        </div>
                    </div>

                    <div className="skills-panel">
                        <p className="section-label">TECHNICAL DEVELOPMENT</p>

                        <h2>What I'm Learning</h2>

                        <div className="skill-item">
                            <div>
                                <strong>Front-End Development</strong>
                                <span>React • JavaScript • HTML • CSS</span>
                            </div>
                            <span className="skill-number">01</span>
                        </div>

                        <div className="skill-item">
                            <div>
                                <strong>Software Development</strong>
                                <span>C# • Python • Programming Fundamentals</span>
                            </div>
                            <span className="skill-number">02</span>
                        </div>

                        <div className="skill-item">
                            <div>
                                <strong>Problem Solving</strong>
                                <span>Logic • Debugging • Application Design</span>
                            </div>
                            <span className="skill-number">03</span>
                        </div>

                        <div className="skill-item">
                            <div>
                                <strong>Version Control</strong>
                                <span>Git • GitHub • Collaborative Development</span>
                            </div>
                            <span className="skill-number">04</span>
                        </div>
                    </div>

                </div>

            </section>
        </main>
    )
}

export default Education