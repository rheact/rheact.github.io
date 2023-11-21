import { useSelector } from 'react-redux';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import _ from 'lodash';
import './cameo.css';

import green from '../images/safe_thick.png';
import orange from '../images/warning_thick.png';
import red from '../images/danger_thick.png';
import warning from '../images/warning.png'

const ReportSection = function ({ className }) {
    const results = useSelector((state) => state.results);

    if (!results || !results.cameoMatrix || !results.cameoMatrix.html_element) {
        return (
            <h3 className={`text-muted ${className}`}>No cameo matrix calculated.</h3>
        );
    }

    const cameo_table = _(results.cameoMatrix.html_element)
        .split('/static/images/reactivity/green_compatible.png')
        .join(green)
        .split('/static/images/reactivity/yellow_caution.png')
        .join(orange)
        .split('/static/images/reactivity/red_incompatible.png')
        .join(red);

    let other_details = _(results.cameoMatrix.details_html)
    .split('/static/images/reactivity/green_compatible.png')
    .join(green)
    .split('/static/images/reactivity/yellow_caution.png')
    .join(orange)
    .split('/static/images/reactivity/red_incompatible.png')
    .join(red)
    .split('/static/images/hazard_bullet_50.png')
    .join(warning)

    other_details = other_details.replaceAll(/width="18"/g, "width='30'")
    other_details = other_details.replaceAll(/height="19"/g, "height='31'")

    return (
        <div className={className} id="cameo-table">
            <h3 className="m-0">Chemical Compatibility Matrix</h3>
            <div className="d-flex cameo-wrapper">
                <div className="Cameo" dangerouslySetInnerHTML={{ __html: cameo_table }} />
                {other_details && 
                    <UncontrolledAccordion>
                        <AccordionItem>
                            <AccordionHeader targetId="1">
                                More details about chemical compatibility
                            </AccordionHeader>
                            <AccordionBody accordionId="1">
                                <div className="cameo-details" dangerouslySetInnerHTML={{ __html: other_details }}/>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                }
            </div>
            <div className="w-100 text-muted">Generated using the CAMEO chemicals tool available online. For more information, check <a href="https://cameochemicals.noaa.gov/" target="_blank">https://cameochemicals.noaa.gov/</a></div>
        </div>
    );
};

export default ReportSection;
