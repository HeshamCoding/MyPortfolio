import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        message: '',
    })

    // Updates the form when someone enters information
    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    // Captures the information and redirects to Home
    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('Contact form submitted:', formData)

        navigate('/')
    }

    return (
        <main className="contact-page">
            <section className="contact-container">

                <div className="page-heading">
                    <p className="section-label">LET'S CONNECT</p>

                    <h1>
                        Contact <span>Me.</span>
                    </h1>

                    <p>
                        Have a question, project idea, or opportunity?
                        Send me a message and let's start a conversation.
                    </p>
                </div>

                <div className="contact-layout">

                    <div className="contact-info">
                        <p className="section-label">CONTACT INFORMATION</p>

                        <h2>Let's build something great.</h2>

                        <p className="contact-intro">
                            I'm always interested in learning, collaborating,
                            and exploring new opportunities in software
                            and web development.
                        </p>

                        <div className="contact-detail">
                            <div className="contact-icon">✉</div>

                            <div>
                                <span>Email</span>
                                <strong>
                                    <a href="mailto:Aryanhesham100@yahoo.com">
                                        Aryanhesham100@yahoo.com
                                    </a>
                                </strong>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-icon">☎</div>

                            <div>
                                <span>Phone</span>
                                <strong>
                                    <a href="tel:+16478195622">
                                        (647) 819-5622
                                    </a>
                                </strong>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-icon">⌖</div>

                            <div>
                                <span>Location</span>
                                <strong>Ontario, Canada</strong>
                            </div>
                        </div>

                        <div className="availability">
                            <span className="availability-dot"></span>
                            Open to new opportunities
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>

                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contactNumber">Contact Number</label>

                                <input
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    placeholder="(000) 000-0000"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>

                            <textarea
                                id="message"
                                name="message"
                                rows="7"
                                placeholder="Tell me about your project or opportunity..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message <span>→</span>
                        </button>

                    </form>

                </div>
            </section>
        </main>
    )
}

export default Contact