import P2SACLogo from "./P2SAC.jpg";

// Black Text
const B = ({ t }) => (
  <span className="fw-bold text-dark">
    {t}
  </span>
);

const GuidePage = () => {
    return (
        <article className="p-lg-5">
            <h1 className="text-muted text-center">
                <B t="R" />eactive <B t="H" />azards <B t="E" />valuation & <B t="A" />nalysis <B t="C" />ompilation <B t="T" />ool
            </h1>

            <hr />

            <div>Developed by:</div>

            <img
                height="64px"
                src="https://sites.utexas.edu/ils/files/2019/08/CISTAR-Logo-Medium-768x301.jpg"
                alt="cistar-logo"
            />
            <img height="64px" src={P2SACLogo} alt="p2sac-logo" />
        </article>
    );
};

export default GuidePage;
