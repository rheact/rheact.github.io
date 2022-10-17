import "./style.css"

const LicensePage = () => {
    return (
        <div className="center-text">
        <div className="license-text">Copyright &copy; 2022 Purdue University All Rights Reserved</div>
        <div className="license-text">Developed by: Center for Innovative and Strategic Transformation of Alkane Resources (<a target="_blank" href="https://cistar.us/" style={{textDecoration: "none"}}>CISTAR</a>) and Purdue Process Safety & Assurance Center (<a target="_blank" href="https://engineering.purdue.edu/P2SAC" style={{textDecoration: "none"}}>P2SAC</a>), Purdue University</div>
        <div className="license-img-wrapper">
            <img className="license-img" src="licensePic1.png"/>
            <img className="license-img" src="licensePic2.png"/>
        </div>
        <div className="license-text">
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
            to deal with the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
            and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        </div>
        <ul className="license-list">
            <li>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimers.</li>
            <li>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimers in the documentation 
                and/or other materials provided with the distribution.
            </li>
            <li>Neither the names of Center for Innovative and Strategic Transformation of Alkane Resources, CISTAR, Purdue Process Safety & Assurance Center, P2SAC, 
                Reactive Hazard Evaluation Analysis and Compilation Tool, RHEACT, or Purdue University, 
                nor the names of the project contributors may be used to endorse or promote products derived from this Software without specific prior written permission.
            </li>
        </ul>
        <div className="license-text">RHEACT source code is available <a target="_blank" href="https://github.com/rheact" style={{textDecoration: "none"}}>here</a></div>
        <div className="license-text">
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
            IN NO EVENT SHALL THE CONTRIBUTORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
            TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS WITH THE SOFTWARE.
        </div>
        </div>
    );
};

export default LicensePage;
