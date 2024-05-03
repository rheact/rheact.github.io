import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

import "./style.css"

const ResourceLinksPage = () => {
    return (
        <>
            <h3 className='resource-page-title'>Safety Resources</h3>
            <div className='resource-links-wrapper'>
                <UncontrolledAccordion open={[]} stayOpen flush>
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            General Chemical Lab and Process Safety
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <ul>
                                <li>CCPS. Handbook for Process Safety in Laboratories and Pilot Plants: A Risk-Based Approach, 1st edition.; Wiley-AIChE: Hoboken, New Jersey, 2023</li>
                                <li>Crowl, D. A.; Louvar, J. F. Chemical Process Safety: Fundamentals with Applications Fourth Edition, 4th edition.; Pearson: Boston, MA, 2019</li>
                                <li>ACS Center for Lab Safety, <a target='_blank' href='https://institute.acs.org/acs-center/lab-safety.html'>Safety Basics & RAMP</a></li>
                                <li>Dow Lab Safety Academy, <a target='_blank' href='https://corporate.dow.com/en-us/science-and-sustainability/innovation/safety-at-dow.html'>Safety at Dow</a></li>
                                <li>AIChE CCPS, <a target='_blank' href='https://www.aiche.org/ccps/community/technological-communities/safety-and-chemical-engineering-education-sache'>Safety and Chemical Engineering Education (SAChE)</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Tools for Further Hazard Analysis
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <ul>
                                <li><a target='_blank' href='https://cameochemicals.noaa.gov/'>CAMEO Chemicals</a></li>
                                <li><a target='_blank' href='https://www.aiche.org/ccps/resources/chemical-reactivity-worksheet'>Chemical Reactivity Worksheet (CRW)</a></li>
                                <li><a target='_blank' href='https://www.aiche.org/ccps/resources/tools/risk-analysis-screening-tool-rast-and-chemical-hazard-engineering-fundamentals-chef'>Risk Analysis and Screening tool (RAST)</a></li>
                                <li><a target='_blank' href='https://www.chetah.org/'>Chemical Thermodynamic and Energy Release Evaluation Program (CHETAH)</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Databases for Physicochemical Properties
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <ul>
                                <li>CRC Handbook of Chemistry and Physics, 95th ed.; Haynes, W. M., Ed.; CRC Press, 2014</li>
                                <li>Pedley, J. B.; Naylor, R. D. “Thermochemical Data of Organic Compounds”; Chapmam and Hall, 1986</li>
                                <li>Wagman, D. D. et al. “The NBS Tables of Chemical Thermodynamic Properties: Selected Values for Inorganic and C1 and C2 Organic Substances in SI Units”. J. Phys. Chem. Ref. Data 1982, 11 (Suppl. 2), 2-1– 2-392</li>
                                <li>Cox, J. D.; Pilcher, G. “Thermochemistry of Organic and Organometallic Compounds”; Academic Press: London, 1970</li>
                                <li>Bretherick’s Handbook of Reactive Chemical Hazards (8th Edition); Urben, P. G., Ed.; Elsevier, 2017; pp xiii–xvi</li>
                                <li>Design Institute for Physical Properties, <a target='_blank' href='https://www.aiche.org/dippr'>DIPPR 801 Chemical Database</a>, 2014</li>
                                <li><a target='_blank' href='https://www.cdc.gov/niosh/index.htm'>National Institute for Occupational Safety and Health (NIOSH)</a></li>
                                <li><a target='_blank' href='https://webbook.nist.gov/chemistry/'>NIST Chemistry WebBook</a></li>
                                <li><a target='_blank' href='https://www.chemspider.com/'>Chemspider</a></li>
                                <li><a target='_blank' href='https://pubchem.ncbi.nlm.nih.gov/'>Pubchem</a></li>
                                <li><a target='_blank' href='https://sso.cas.org/as/authorization.oauth2?response_type=code&client_id=SciFinderWeb&redirect_uri=https%3A%2F%2Fscifinder.cas.org%2Fpa%2Foidc%2Fcb&state=eyJ6aXAiOiJERUYiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2Iiwia2lkIjoiZXBNblhpRVc2NVgyLU5CUTU1LWhCdDJBYTFFIiwic3VmZml4IjoiSXlSdEVxLjE2OTk4Mjg0NzYifQ..4BgUjTxHJS0gdzqew2_Tfg.78r-1rHW8maaTPVZysGnwF_XTB0_gyRpuTYI2bwp0T7qsbwVnu_SLvWSE_1qfFNJfG4yRzopWoTJTKGrTrpe0Q.FvIYs4HLKJPfnHUO7LL5Pw&nonce=RwXLTDF1KhScN56J43fKBim8g7fCCxycTaYv8Wz47Ak&scope=openid%20address%20email%20phone%20profile&vnd_pi_requested_resource=https%3A%2F%2Fscifinder.cas.org%2Fscifinder&vnd_pi_application_name=SciFinderWebIDF'>SciFinder</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="4">
                            Enthalpy of Reaction Calculators
                        </AccordionHeader>
                        <AccordionBody accordionId='4'>
                            <ul>
                                <li><a target='_blank' href='https://www.wolframalpha.com/input?i=Na+%2B+Cl2+-%3E+NaCl'>WolframAlpha</a></li>
                                <li><a target='_balnk' href='https://www.omnicalculator.com/physics/enthalpy'>Omni Calculator </a></li>
                                <li><a target='_blank' href='https://www.calctool.org/thermodynamics/enthalpy.'>CalcTool</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='5'>
                            PPE Selection Guides
                        </AccordionHeader>
                        <AccordionBody accordionId='5'>
                            <ul>
                                <li>OSHA Personal Protective Equipment, <a target='_blank' href='https://www.osha.gov/sites/default/files/publications/osha3151.pdf'>OSHA 3151-02R 2023</a></li>
                                <li>Purdue University EHS; <a target='_balnk' href='https://www.purdue.edu/ehps/rem/laboratory/Personal/PPE/gloveselection.pdf'>Glove Selection Guide</a></li>
                                <li><a target='_blank' href='https://corporate.dow.com/content/dam/corp/documents/science-sustainability/920-00004-01-personal-protective-equipment-guidance.pdf'>DOW PPE Guidance</a></li>
                                <li>University of California Los Angeles (UCLA) EHS; <a target='_blank' href='https://ucla.app.box.com/v/ehs-ppe-selection-guide'>PPE Selection Guide</a></li>
                                <li>University of California Merced (UCMerced) EHS, <a target='_blank' href='https://ehs.ucmerced.edu/researchers-labs/ppe/selection'>Choosing the Correct PPE</a></li>
                                <li>University of South Florida (USF) EHS; <a target='_blank' href='https://www.usf.edu/administrative-services/environmental-health-safety/documents/hazard_control_ppe_guide.pdf'>Hazard Control & PPE Selection Guide</a></li>
                                <li>University of Washington (UW) EHS; <a target='_blank' href='https://www.ehs.washington.edu/system/files/resources/ppeguidelines.pdf'>Guidelines for PPE</a></li>
                                <li>University of California San Francisco (UCSF) <a target='_blank' href='https://ehs.ucsf.edu/laboratory-coat-selection-guide'>Laboratory Coat Selection Guide</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='6'>
                            Chemical Glove Compatibility
                        </AccordionHeader>
                        <AccordionBody accordionId='6'>
                            <ul>
                                <li><a target='_blank' href='https://www.aaesi.com/ansell_8th-edition-chemical-resistance-guide/'>Ansell Chemical Resistance Guide Permeation and Degradation Guide 8th Edition</a></li>
                                <li><a target='_blank' href='https://us.vwr.com/us.vwr.com/en_US/images/Ansell_Chemical_Glove_Resistance_Guide_Aug_2016.pdf'>VWR Chemical Resistance Gloves Chart</a></li>
                                <li><a target='_blank' href='https://www.coleparmer.com/chemical-resistance'>Cole Parmer Chemical Compatibility Database</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='7'>
                            Reproductive Hazards & Carcinogens
                        </AccordionHeader>
                        <AccordionBody accordionId='7'>
                            <ul>
                                <li><a target='_blank' href='https://ehs.stanford.edu/subtopic/reproductive-and-developmental-health-protection'>Stanford Reproductive and Developmental Health Protection</a></li>
                                <li>University of North Carolina at Chapel Hill; <a target='_blank' href='https://policies.unc.edu/TDClient/2833/Portal/KB/ArticleDet?ID=132020'>Laboratory Safety Manual - Chapter 08: Reproductive Hazards</a></li>
                                <li>Purdue University Department of Chemistry ChemSafety: <a target='_blank' href='https://www.chem.purdue.edu/chemsafety/chem/carcinogens.html'>Carcinogens</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='8'>
                            Chemical Releases, Fire & Explosions, Layer of Protection Analysis
                        </AccordionHeader>
                        <AccordionBody accordionId='8'>
                            <ul>
                                <li><a target='_blank' href='https://doi.org/10.1002/9780470935309'>Dow’s Chemical Exposure Index Guide</a>, 1st ed.; John Wiley & Sons, Ltd, 1998</li>
                                <li><a target='_blank' href='https://doi.org/10.1002/9780470938195'>Dow’s Fire & Explosion Index Hazard Classification Guide</a>, 1st ed.; John Wiley & Sons, Ltd, 1994</li>
                                <li>Willey, R. J. Layer of Protection Analysis. Procedia Eng. 2014, 84, 12−22</li>
                                <li>AIChE Center for Chemical Process Safety. Layer of Protection Analysis Simplified Process Risk Assessment; CCPS concept book: New York, 2001</li>
                                <li>Stoessel, F. <a target='_blank' href='https://onlinelibrary.wiley.com/doi/10.1002/9783527696918.fmatter'>Thermal Safety of Chemical Processes: Risk Assessment and Process Design</a>, 2nd edition; Wiley; Weinheim, Germany, 2020</li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='9'>
                            Management of Change (MOC)
                        </AccordionHeader>
                        <AccordionBody accordionId='9'>
                            <ul>
                                <li>Bassan et al., Merck’s Reaction Review Policy: Org. Process Res. Dev. 2013, 17, 1611−1616</li>
                                <li><a target='_blank' href='https://corporate.dow.com/content/dam/corp/documents/science-sustainability/920-00003-01-lab-hazard-risk-assessment-trigger-grid.pdf'>DOW Lab Hazard Risk Assessment Trigger Grid</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='10'>
                            Standard Operating Procedures (SOP)
                        </AccordionHeader>
                        <AccordionBody accordionId='10'>
                            <ul>
                                <li>Chandra, T. et al. “Generating Standard Operating Procedures for the Manipulation of Hazardous Chemicals in Academic Laboratories.” ACS Chem. Health Saf. 2021, 28,19−24</li>
                                <li>UC Davis EHS, <a target='_blank' href='https://safetyservices.ucdavis.edu/units/ehs/research/chemical/sop-templates'>SOP Templates</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='11'>
                            Lab Hazard Identification
                        </AccordionHeader>
                        <AccordionBody accordionId='11'>
                            <ul>
                                <li>Leggett, D. J. Identifying Hazards in the Chemical Research Laboratory. Process Saf. Prog. 2012, 31, 393−397</li>
                                <li>Mulcahy, M. B.; Boylan, C.; Sigmann, S.; Stuart, R. “Using Bowtie Methodology to Support Laboratory Hazard Identification, Risk Management, and Incident Analysis”. J. Chem. Health Saf. 2017, 24, 14−20</li>
                                <li>ACS Center for Lab Safety, <a target='_blank' href='https://institute.acs.org/acs-center/lab-safety/hazard-assessment/fundamentals.html'>Fundamentals of Hazard Assessment</a></li>
                                <li>UCLA <a target='_blank' href='https://content-calpoly-edu.s3.amazonaws.com/chemistry/1/documents/Safety_Laboratory%20Hazard%20Assessment%20Tool.pdf'>Laboratory Hazard Assessment Tool</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='12'>
                            Lab Safety Incidents and Case Studies
                        </AccordionHeader>
                        <AccordionBody accordionId='12'>
                            <ul>
                                <li><a target='_blank' href='https://www.csb.gov/csb-releases-laboratory-incident-data-jan2001---jul-2018/'>CSB Releases Laboratory Incident Data</a> (Jan. 2001- Jul. 2018)</li>
                                <li><a target='_blank' href='https://www.csb.gov/investigations/completed-investigations/'>CSB Completed Investigations</a></li>
                                <li>Kaufman, J. A. <a target='_blank' href='https://www.labsafety.org/memorial-wall'>Memorial Wall - Killed in Lab Accident</a>, Laboratory Safety Institute</li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='13'>
                            Lessons Learned and Near Misses
                        </AccordionHeader>
                        <AccordionBody accordionId='13'>
                            <ul>
                                <li>Stuart, R. <a target='_blank' href='https://dchas.org/2022/07/16/laboratory-lessons-learned/.'>Laboratory Lessons Learned Pages</a></li>
                                <li>Gibson, J. H. et al. “A Research University’s Rapid Response to a Fatal Chemistry Accident: Safety Changes and Outcomes.” J. Chem. Health Saf. 2014, 21,18</li>
                                <li>Juba, B. W. et al. “Lessons Learned Fluoride Exposure and Response.” ACS Chem. Health Saf. 2021, 28, 129−133</li>
                                <li>Vidal, S. “Safety First: A Recent Case of a Dichloromethane Injection Injury.” ACS Cent. Sci. 2020, 6,83−86</li>
                                <li>Gosavi, A. et al. “Retrospective Analysis of Compensable Injuries in University Research Laboratories and the Possible Prevention of Future Incidents.” J. Chem. Health Saf. 2019, 26, 31−37</li>
                                <li>Phimister, J. R. et al. “Near-Miss Incident Management in the Chemical Process Industry.” Risk Anal. 2003, 23, 445−459</li>
                                <li>Ting, J. M. “Safety Moments in Chemical Safety Education.” J. Chem. Educ. 2021, 98, 9−14</li>
                                <li>Clark, D. E. “Peroxides and Peroxide-Forming Compounds.” Chem. Health Saf. 2001, 8,12−22</li>
                                <li>Svenningsen, G. S. et al. “Lessons Learned: Fluoride Exposure.” ACS Chem. Health Saf. 2020, 27, 40</li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='14'>
                            Building Good Safety Culture
                        </AccordionHeader>
                        <AccordionBody accordionId='14'>
                            <ul>
                                <li>Ezenwa, S. et al. “Toward Improved Safety Culture in Academic and Industrial Chemical Laboratories: An Assessment and Recommendation of Best Practices.” ACS Chem. Health Saf. 2022, 29, 202</li>
                                <li>Bertozzi, C. R. Ingredients for a Positive Safety Culture. ACS Cent. Sci. 2016, 2, 764−766</li>
                                <li>Kimble-Hill, A. C. Incorporating Identity Safety into the Laboratory Safety Culture. ACS Chem. Health Saf. 2021, 28, 103</li>
                                <li><a target='_blank' href='https://dchas.org/lab-safety-teams/'>Academic Lab Safety Teams</a></li>
                                <li>Purdue University Davidson School of Chemical Engineering
                                    <ul>
                                        <li><a target='_blank' href='https://engineering.purdue.edu/ChE/aboutus/safety/responsibilities-of-safety-officers'>Responsibilities of Safety Officers</a></li>
                                        <li><a target='_blank' href='https://engineering.purdue.edu/ChE/aboutus/safety/guidelines-for-safety-training'>Guidelines for safety training of new researchers in ChE Laboratories</a></li>
                                    </ul>
                                </li>
                                <li>Mulcahy, M. B.; Holmes, J.; Rossol, M. Let’s Disagree about Safety. ACS Chem. Health Saf. 2020, 27 (3), 135–138</li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='15'>
                            Chemical Inventory Management
                        </AccordionHeader>
                        <AccordionBody accordionId='15'>
                            <ul>
                                <li>Foster, B. L. The Chemical Inventory Management System in Academia. Chem. Health Saf. 2005, 12, 21−25</li>
                                <li>Payne, M. K. et al., “The Chemical Management System (CMS): A Useful Tool for Inventory Management. J. Chem.” Educ. 2020, 97 (7), 1795–1798</li>
                                <li>Ott, J. et al. “ChemStor: Using Formal Methods to Guarantee Safe Storage and Disposal of Chemicals.” J. Chem. Inf. Model. 2020, 60 (7), 3416–3422</li>
                                <li>SafetyCulture.com, <a target='_blank' href='https://safetyculture.com/app/chemical-inventory-software'>Chemical Inventory Software</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='16'>
                            Emergency Response Training
                        </AccordionHeader>
                        <AccordionBody accordionId='16'>
                            <ul>
                                <li>Stuart, R. Emergency Response Training for Laboratory Workers. J. Chem. Health Saf. 2010, 17, 29−32</li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId='17'>
                            Safety Training Videos
                        </AccordionHeader>
                        <AccordionBody accordionId='17'>
                            <ul>
                                <li>Dow Lab Safety Academy, <a target='_blank' href='https://corporate.dow.com/en-us/science-and-sustainability/innovation/safety-at-dow/orientation-and-training.html'>Safety Orientation and Training Videos</a></li>
                                <li><a target='_blank' href='https://www.youtube.com/playlist?list=PLLG7h7fPoH8IZ6i2rfDK0zVoompXayRL_'>ACS Chemical Safety on YouTube</a></li>
                                <li>Laboratory Safety Institute, <a target='_blank' href='https://www.labsafety.org/lab-safety-videos'>Lab Safety Videos</a></li>
                                <li>U.S. Chemical Safety Board, <a target='_blank' href='https://www.youtube.com/watch?v=ALBWxGik64A'>Experimenting with Danger</a></li>
                                <li><a target='_blank' href='https://docs.google.com/spreadsheets/d/16CXF7AAsyd8VN7Na0dkQ1p2cB3nwrQxVZXWRWg52TDQ/edit#gid=0'>C&EN List of Labs Safety Videos</a></li>
                                <li>University of California San Diego, <a href='https://blink.ucsd.edu/safety/research-lab/laboratory/videos.html'>Laboratory Safety Videos</a></li>
                                <li>Rutgers University Chemical Laboratory Safety, <a target='_blank' href='https://libguides.rutgers.edu/chem_lab_safety/videos'>Training Videos</a></li>
                                <li>SafetyVideos.com, <a target='_blank' href='https://www.safetyvideos.com/Lab_Safety_Videos_s/54.htm'>Laboratory Safety Training Videos</a></li>
                            </ul>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
            </div>
        </>
    );
};

export default ResourceLinksPage;
