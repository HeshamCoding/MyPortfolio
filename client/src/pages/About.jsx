import profileImage from '../assets/profile.jpg'

function About() {
    return (
        <main className="about-page">
            <section className="about-container">

                <div className="about-image-section">
                    <div className="profile-card">
                        <img
                            src={profileImage}
                            alt="Hesham Aryan"
                            className="profile-image"
                        />
                    </div>
                </div>

                <div className="about-content">
                    <p className="section-label">GET TO KNOW ME</p>

                    <h1>
                        About <span>Me.</span>
                    </h1>

                    <h2>Hi, I'm Hesham Aryan 👋</h2>

                    <p className="about-description">
                        I'm a Software Engineering student at Centennial College with
                        a strong interest in programming, web development, and building
                        useful digital experiences. I enjoy learning new technologies
                        and challenging myself through hands-on projects.
                    </p>

                    <p className="about-description">
                        My goal is to continue developing my technical and
                        problem-solving skills while creating applications that are
                        clean, functional, and enjoyable to use.
                    </p>

                    <div className="about-info">
                        <div>
                            <span>Location</span>
                            <strong>Ontario, Canada</strong>
                        </div>

                        <div>
                            <span>Focus</span>
                            <strong>Software Development</strong>
                        </div>

                        <div>
                            <span>Education</span>
                            <strong>Centennial College</strong>
                        </div>

                        <div>
                            <span>Interests</span>
                            <strong>Web & Application Development</strong>
                        </div>
                    </div>

                    <a
                        href="/Hesham-Aryan-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-btn resume-btn"
                    >
                        View My Resume ↗
                    </a>
                </div>

            </section>
        </main>
    )
}

export default About