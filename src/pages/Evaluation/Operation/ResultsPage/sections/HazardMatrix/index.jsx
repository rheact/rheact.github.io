import { connect } from 'react-redux';
import { useState } from 'react'
import { Tooltip } from "reactstrap";
import yellow from '../images/caution_thick.png';
import red from '../images/danger_thick.png';
import green from '../images/safe_thick.png';
import orange from '../images/warning_thick.png';

const Matrix = function ({ results, className }) {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (!results || !results.hazardMatrix) {
        return (
            <h3 className={`text-muted ${className}`}>
                No hazard matrix generated.
            </h3>
        );
    }

    const matrix = results.hazardMatrix;
    const columns = [
        'Name',
        'Skin absorption',
        'Skin contact',
        'Eye contact',
        'Respiratory',
        'Ingestion',
        'Sensitizer',
        'Carcinogen',
        'Reproductive hazard',
        'Organ toxicity',
        'Flammability',
        'Reactivity or explosivity',
    ];

    const newMatrix = [];

    matrix.forEach((element) => {
        newMatrix.push({ ...element });
    });
    newMatrix.forEach((element) => {
        switch (element.carcinogen) {
        case '#7fd13b':
            element.carcinogenPic = green;
            break;
        case '#ffff00':
            element.carcinogenPic = yellow;
            break;
        case '#ffa500':
            element.carcinogenPic = orange;
            break;
        case '#c00000':
            element.carcinogenPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.eyeContact) {
        case '#7fd13b':
            element.eyeContactPic = green;
            break;
        case '#ffff00':
            element.eyeContactPic = yellow;
            break;
        case '#ffa500':
            element.eyeContactPic = orange;
            break;
        case '#c00000':
            element.eyeContactPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.flammability) {
        case '#7fd13b':
            element.flammabilityPic = green;
            break;
        case '#ffff00':
            element.flammabilityPic = yellow;
            break;
        case '#ffa500':
            element.flammabilityPic = orange;
            break;
        case '#c00000':
            element.flammabilityPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.ingestion) {
        case '#7fd13b':
            element.ingestionPic = green;
            break;
        case '#ffff00':
            element.ingestionPic = yellow;
            break;
        case '#ffa500':
            element.ingestionPic = orange;
            break;
        case '#c00000':
            element.ingestionPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.reactivityOrExplosivity) {
        case '#7fd13b':
            element.reactivityOrExplosivityPic = green;
            break;
        case '#ffff00':
            element.reactivityOrExplosivityPic = yellow;
            break;
        case '#ffa500':
            element.reactivityOrExplosivityPic = orange;
            break;
        case '#c00000':
            element.reactivityOrExplosivityPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.reproductiveHazard) {
        case '#7fd13b':
            element.reproductiveHazardPic = green;
            break;
        case '#ffff00':
            element.reproductiveHazardPic = yellow;
            break;
        case '#ffa500':
            element.reproductiveHazardPic = orange;
            break;
        case '#c00000':
            element.reproductiveHazardPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.respiratory) {
        case '#7fd13b':
            element.respiratoryPic = green;
            break;
        case '#ffff00':
            element.respiratoryPic = yellow;
            break;
        case '#ffa500':
            element.respiratoryPic = orange;
            break;
        case '#c00000':
            element.respiratoryPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.sensitizer) {
        case '#7fd13b':
            element.sensitizerPic = green;
            break;
        case '#ffff00':
            element.sensitizerPic = yellow;
            break;
        case '#ffa500':
            element.sensitizerPic = orange;
            break;
        case '#c00000':
            element.sensitizerPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.skinAbsorption) {
        case '#7fd13b':
            element.skinAbsorptionPic = green;
            break;
        case '#ffff00':
            element.skinAbsorptionPic = yellow;
            break;
        case '#ffa500':
            element.skinAbsorptionPic = orange;
            break;
        case '#c00000':
            element.skinAbsorptionPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.skinContact) {
        case '#7fd13b':
            element.skinContactPic = green;
            break;
        case '#ffff00':
            element.skinContactPic = yellow;
            break;
        case '#ffa500':
            element.skinContactPic = orange;
            break;
        case '#c00000':
            element.skinContactPic = red;
            break;
        default:
            console.log('Error: Unknown value');
        }

        switch (element.organToxicity) {
            case '#7fd13b':
                element.organToxicityPic = green;
                break;
            case '#ffff00':
                element.organToxicityPic = yellow;
                break;
            case '#ffa500':
                element.organToxicityPic = orange;
                break;
            case '#c00000':
                element.organToxicityPic = red;
                break;
            default:
                console.log('Error: Unknown value');
            }
    });

    return (
        <div className={className}>
            <h3>Hazard Matrix</h3>
            <table align="center" style={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column, i) => (
                            <th style={styles.th} key={i}>
                                {column}
                                {column === "Other" && 
                                    <>
                                        <i style={{marginLeft: "10px"}} id="otherHint" className="bi bi-question-circle"></i>
                                        <Tooltip
                                            style={{textTransform: "none"}}
                                            placement="top"
                                            isOpen={tooltipOpen}
                                            autohide={false}
                                            target="otherHint"
                                            toggle={toggle}
                                        >
                                            H370, H372, H373, H305
                                        </Tooltip>
                                    </>
                                }
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            <td style={{ ...styles.th }}>{row.name}</td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.skinAbsorption,
                                    backgroundColor: row.skinAbsorption,
                                }}
                            >
                                <img
                                    src={newMatrix[i].skinAbsorptionPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.skinContact,
                                    backgroundColor: row.skinContact,
                                }}
                            >
                                <img
                                    src={newMatrix[i].skinContactPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.eyeContact,
                                    backgroundColor: row.eyeContact,
                                }}
                            >
                                <img
                                    src={newMatrix[i].eyeContactPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.respiratory,
                                    backgroundColor: row.respiratory,
                                }}
                            >
                                <img
                                    src={newMatrix[i].respiratoryPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.ingestion,
                                    backgroundColor: row.ingestion,
                                }}
                            >
                                <img
                                    src={newMatrix[i].ingestionPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.sensitizer,
                                    backgroundColor: row.sensitizer,
                                }}
                            >
                                <img
                                    src={newMatrix[i].sensitizerPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.carcinogen,
                                    backgroundColor: row.carcinogen,
                                }}
                            >
                                <img
                                    src={newMatrix[i].carcinogenPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.reproductiveHazard,
                                    backgroundColor: row.reproductiveHazard,
                                }}
                            >
                                <img
                                    src={newMatrix[i].reproductiveHazardPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.organToxicity,
                                    backgroundColor: row.organToxicity,
                                }}
                            >
                                <img
                                    src={newMatrix[i].organToxicityPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.flammability,
                                    backgroundColor: row.flammability,
                                }}
                            >
                                <img
                                    src={newMatrix[i].flammabilityPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                            <td
                                style={{
                                    ...styles.th,
                                    color: row.reactivityOrExplosivity,
                                    backgroundColor: row.reactivityOrExplosivity,
                                }}
                            >
                                <img
                                    src={newMatrix[i].reactivityOrExplosivityPic}
                                    alt="green"
                                    style={styles.image}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="Legend" style={styles.legend}>
                <span>Legend:</span>
                <div style={styles.legendItem}>
                    <img src={green} alt="green" style={styles.image} />
                    Safe
                </div>
                <div style={styles.legendItem}>
                    <img src={yellow} alt="yellow" style={styles.image} />
                    Caution
                </div>
                <div style={styles.legendItem}>
                    <img src={orange} alt="orange" style={styles.image} />
                    Warning
                </div>
                <div style={styles.legendItem}>
                    <img src={red} alt="red" style={styles.image} />
                    Danger
                </div>
            </div>

            {/* <div className="d-flex flex-column">
                <span>
                    The following links can guide the PPE selection process:
                </span>
                {links.map((link) => (
                    <a target="_blank" key={link} href={link}>
                        {link}
                    </a>
                ))}
            </div> */}

            <div className="text-muted w-100">
                Generated by parsing the H-phrases from the SDS and classifying
                the system components based on the handling hazards.
            </div>
        </div>
    );
};

const styles = {
    table: {
        borderSpacing: '0',
        border: '1px solid black',
        align: 'center',
        width: '100%',
        fontSize: '1vw',
    },

    th: {
        margin: '0',
        padding: '0.5rem',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        lineHeight: '1.5',
        textAlign: 'center',
    },

    td: {
        margin: '0',
        padding: '0.5rem',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
    },

    legend: {
        display: 'flex',
        justifyContent: 'center',
        color: 'black',
    },

    legendItem: {
        padding: '0em 1em',
    },

    image: {
        margin: '0px 6px',
        width: '20px',
        height: '20px',
    },
};

const mapStateToProps = (state) => ({
    results: state.results,
});

export default connect(mapStateToProps)(Matrix);
