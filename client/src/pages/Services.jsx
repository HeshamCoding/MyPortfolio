function Services() {
    const services = [
        {
            icon: "💻",
            number: "01",
            title: "Web Development",
            description:
                "Building modern, responsive, and user-friendly websites using current web technologies.",
            skills: ["React", "JavaScript", "HTML", "CSS"],
        },
        {
            icon: "⚙️",
            number: "02",
            title: "Application Development",
            description:
                "Creating functional applications with clean programming logic and a focus on solving real problems.",
            skills: ["C#", "Python", "Programming"],
        },
        {
            icon: "🎨",
            number: "03",
            title: "Front-End Design",
            description:
                "Designing clean and engaging interfaces that provide users with an intuitive digital experience.",
            skills: ["UI Design", "Responsive Design", "CSS"],
        },
        {
            icon: "🛠️",
            number: "04",
            title: "Debugging & Support",
            description:
                "Finding programming issues, improving existing code, and helping applications work more reliably.",
            skills: ["Debugging", "Testing", "Problem Solving"],
        },
    ]

    return (
        <main className="services-page">
            <section className="services-container">

                <div className="page-heading">
                    <p className="section-label">WHAT I DO</p>

                    <h1>
                        My <span>Services.</span>
                    </h1>

                    <p>
                        I combine programming, design, and problem-solving skills to build
                        clean and useful digital experiences.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <article className="service-card" key={service.number}>
                            <div className="service-top">
                                <div className="service-icon">{service.icon}</div>
                                <span className="service-number">{service.number}</span>
                            </div>

                            <h2>{service.title}</h2>

                            <p className="service-description">
                                {service.description}
                            </p>

                            <div className="service-skills">
                                {service.skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>

                            <div className="service-line"></div>
                        </article>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default Services