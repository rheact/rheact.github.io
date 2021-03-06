import { useSelector } from 'react-redux';
import _ from 'lodash';
import './cameo.css';

import green from '../images/safe_thick.png';
import orange from '../images/warning_thick.png';
import red from '../images/danger_thick.png';

const ReportSection = function ({ className }) {
    const results = useSelector((state) => state.results);

    if (!results || !results.cameoMatrix || !results.cameoMatrix.html_element) {
        return (
            <h2 className={`text-muted ${className}`}>No cameo matrix calculated.</h2>
        );
    }

    const data = _(results.cameoMatrix.html_element)
        .split('/images/reactivity/green_compatible.png').join(green)
        .split('/images/reactivity/yellow_caution.png')
        .join(orange)
        .split('/images/reactivity/red_incompatible.png')
        .join(red);

    return (
        <div className={className}>
            <h2 className="m-0">Cameo Matrix</h2>
            <div className="d-flex justify-content-center">
                <div className="Cameo" dangerouslySetInnerHTML={{ __html: data }} />
            </div>
            <div className="w-100 text-muted">Generated using the CAMEO chemicals tool available online. For more information, check https://cameochemicals.noaa.gov/</div>
        </div>
    );
};

export default ReportSection;
