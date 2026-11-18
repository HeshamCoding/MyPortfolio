function Projects() {
    const projects = [
        {
            number: "01",
            title: "Personal Portfolio Website",
            description:
                "A modern responsive portfolio built with React to showcase my skills, education, projects, and development experience.",
            role: "Front-End Developer",
            outcome:
                "Created a responsive multi-page React application with reusable components and modern UI design.",
            technologies: ["React", "JavaScript", "CSS"],
        },
        {
            number: "02",
            title: "Web Design Project",
            description:
                "A collaborative website project focused on creating an attractive and user-friendly web experience.",
            role: "Web Designer & Developer",
            outcome:
                "Helped design the interface, organize page layouts, add visual content, and build navigation between pages.",
            technologies: ["HTML", "CSS", "JavaScript"],
        },
        {
            number: "03",
            title: "C# Application",
            description:
                "A programming project developed using C# to practice application logic, user input, validation, and problem solving.",
            role: "Software Developer",
            outcome:
                "Built a functional application while strengthening my understanding of programming fundamentals and clean code.",
            technologies: ["C#", ".NET", "Programming"],
        },
    ]

    return (
        <main className="projects-page">
            <section className="projects-container">

                <div className="page-heading">
                    <p className="section-label">SELECTED WORK</p>

                    <h1>
                        My <span>Projects.</span>
                    </h1>

                    <p>
                        A collection of projects that represent my development journey,
                        technical skills, and passion for building.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <article className="project-card" key={project.number}>

                            <div className="project-image">
                                <span>{project.number}</span>
                                <p>Project Preview</p>
                            </div>

                            <div className="project-content">
                                <p className="project-number">
                                    PROJECT {project.number}
                                </p>

                                <h2>{project.title}</h2>

                                <p className="project-description">
                                    {project.description}
                                </p>

                                <div className="project-details">
                                    <p>
                                        <strong>My Role</strong>
                                        {project.role}
                                    </p>

                                    <p>
                                        <strong>Outcome</strong>
                                        {project.outcome}
                                    </p>
                                </div>

                                <div className="project-technologies">
                                    {project.technologies.map((technology) => (
                                        <span key={technology}>{technology}</span>
                                    ))}
                                </div>
                            </div>

                        </article>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default Projects