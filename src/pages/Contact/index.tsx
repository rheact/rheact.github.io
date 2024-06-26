import "./style.css"

const ContactUsPage = () => {
    return (
        <div className="center-text">
            <div>For questions and inquiries about RHEACT, please contact:
                <ul className="contact-list">
                    <li>Andrew Norfleet (<a target="_blank" href = "mailto: anorfle@purdue.edu">anorfle@purdue.edu</a>)</li>
                    <li>Sopuru Ezenwa (<a target="_blank" href = "mailto: sezenwa@purdue.edu">sezenwa@purdue.edu</a>)</li>
                    <li>Prof. Ray Mentzer (<a target="_blank" href = "mailto: rmentzer@purdue.edu">rmentzer@purdue.edu</a>)</li>
                </ul>
            </div>
            <div>
                To provide feedback on your experience with RHEACT please fill out the following <a target="_blank" href="https://forms.gle/VFi3uqFjVCutRDuj9">form</a>
            </div>
        </div>
    );
};

export default ContactUsPage;
