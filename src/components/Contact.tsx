import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { useState, FormEvent } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Using Web3Forms (free service - you'll need to get your access key from https://web3forms.com)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d7aa7b67-582b-47f3-84ec-590fc75857ad", // Replace with your actual key
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Get In Touch</h3>

        <div className="contact-main-grid">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h4 className="form-title">Send me a message</h4>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input form-textarea"
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="form-message form-success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="form-message form-error">
                  Oops! Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="contact-info-wrapper">
            <div className="contact-box">
              <h4>Direct Contact</h4>
              <p>
                <a href="mailto:deepan.ppgit@gmail.com" data-cursor="disable">
                  deepan.ppgit@gmail.com
                </a>
              </p>
              <h4>Phone</h4>
              <p>
                <a href="tel:+918072286708" data-cursor="disable">
                  +91 80722 86708
                </a>
              </p>
            </div>

            <div className="contact-box contact-social-box">
              <h4>Connect With Me</h4>
              <a
                href="https://github.com/deepan-g2"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/deepan-kumar-5972a0a8/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
              <a
                href="https://medium.com/@deepan.ppgit"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Medium <MdArrowOutward />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Twitter <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer">
          <h2>
            Designed and Developed <br /> by <span>Deepan Kumar</span>
          </h2>
          <h5>
            <MdCopyright /> 2024
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
