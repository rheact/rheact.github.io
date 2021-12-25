import React from 'react';
import { useSelector } from 'react-redux';

let key = 0;

const Alert = function ({ className }) {
    const reactionInfo = useSelector((state) => state.results.reactionInfo);
    const sideReactions = useSelector((state) => state.operatingParams.sideReactions);
    const numSideReactions = useSelector((state) => state.operatingParams.numSideReactions);

    const reactants = useSelector((state) => state.compound.reactants);
    const products = useSelector((state) => state.compound.products);
    const diluents = useSelector((state) => state.compound.diluents);
    const numReactants = useSelector((state) => state.compound.numReactants);
    const numProducts = useSelector((state) => state.compound.numProducts);
    const numDiluents = useSelector((state) => state.compound.numDiluents);

    if (!reactionInfo) {
        return (<h2 className={`text-muted ${className}`}>No alerts.</h2>);
    }

    const compareReactants = () => {
        const arr = [];

        // calculation failed
        if (isNaN(reactionInfo.finalTemp)) return arr;

        for (let i = 0; i < numReactants; i++) {
            // boilingPt
            if (!isNaN(Number(reactants[i].boilingPt))) {
                if (Number(reactionInfo.finalTemp) > Number(reactants[i].boilingPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds reactant
                            {i + 1}
                            {' '}
boiling point
                        </span>
                        <br />
                    </React.Fragment>);
                }
            }

            // flashPt
            if (!isNaN(Number(reactants[i].flashPt))) {
                if (Number(reactionInfo.finalTemp) > Number(reactants[i].flashPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds reactant
                            {i + 1}
                            {' '}
flash point
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // decompositionTemp
            if (!isNaN(Number(reactants[i].decompositionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(reactants[i].decompositionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds reactant
                            {i + 1}
                            {' '}
decomposition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // autoignitionTemp
            if (!isNaN(Number(reactants[i].autoignitionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(reactants[i].autoignitionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds reactant
                            {i + 1}
                            {' '}
auto ignition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }
        }

        return arr;
    };

    const compareProducts = () => {
        const arr = [];

        // calculation failed
        if (isNaN(reactionInfo.finalTemp)) return arr;

        for (let i = 0; i < numProducts; i++) {
            // boilingPt
            if (!isNaN(Number(products[i].boilingPt))) {
                if (Number(reactionInfo.finalTemp) > Number(products[i].boilingPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds product
                            {i + 1}
                            {' '}
boiling point
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // flashPt
            if (!isNaN(Number(products[i].flashPt))) {
                if (Number(reactionInfo.finalTemp) > Number(products[i].flashPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds product
                            {i + 1}
                            {' '}
flash point
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // decompositionTemp
            if (!isNaN(Number(products[i].decompositionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(products[i].decompositionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds product
                            {i + 1}
                            {' '}
decomposition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // autoignitionTemp
            if (!isNaN(Number(products[i].autoignitionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(products[i].autoignitionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds product
                            {i + 1}
                            {' '}
auto ignition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }
        }

        return arr;
    };

    const compareDiluents = () => {
        const arr = [];

        // calculation failed
        if (isNaN(reactionInfo.finalTemp)) return arr;

        for (let i = 0; i < numDiluents; i++) {
            // boilingPt
            if (!isNaN(Number(diluents[i].boilingPt))) {
                if (Number(reactionInfo.finalTemp) > Number(diluents[i].boilingPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds diluent
                            {i + 1}
                            {' '}
boiling point
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // flashPt
            if (!isNaN(Number(diluents[i].flashPt))) {
                if (Number(reactionInfo.finalTemp) > Number(diluents[i].flashPt)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds diluent
                            {i + 1}
                            {' '}
flash point
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // decompositionTemp
            if (!isNaN(Number(diluents[i].decompositionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(diluents[i].decompositionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds diluent
                            {i + 1}
                            {' '}
decomposition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }

            // autoignitionTemp
            if (!isNaN(Number(diluents[i].autoignitionTemp))) {
                if (Number(reactionInfo.finalTemp) > Number(diluents[i].autoignitionTemp)) {
                    arr.push(<React.Fragment key={key++}>
                        <span style={style.alert}>
Final temp exceeds diluent
                            {i + 1}
                            {' '}
auto ignition temp
                        </span>
                        <br />
                             </React.Fragment>);
                }
            }
        }

        return arr;
    };

    const compareSideReactions = () => {
        const arr = [];

        // valid final temp
        if (!isNaN(reactionInfo.finalTemp)) {
            for (let i = 0; i < numSideReactions; i++) {
                if (sideReactions[i].tempOnset === '') continue;

                // temperature onset
                if (!isNaN(Number(sideReactions[i].tempOnset))) {
                    if (Number(reactionInfo.finalTemp) > Number(sideReactions[i].tempOnset)) {
                        arr.push(<React.Fragment key={key++}>
                            <span style={style.alert}>
Final temp exceeds side reaction
                                {i + 1}
                                {' '}
temperature onset
                            </span>
                            <br />
                                 </React.Fragment>);
                    }
                }
            }
        }

        // valid final pressure
        // if (!isNaN(reactionInfo.adiabaticPressure)) {
        //     for (let i = 0; i < numSideReactions; i++) {
        //         if (sideReactions[i].pressureOnset === '')
        //             continue

        //         // pressure onset
        //         if (!isNaN(Number(sideReactions[i].pressureOnset))) {
        //             if (Number(reactionInfo.adiabaticPressure) > Number(sideReactions[i].pressureOnset) ) {
        //                 arr.push(<React.Fragment key={key++}><span style={style.alert}>Final pressure exceeds side reaction {i + 1} pressure onset</span><br/></React.Fragment>)
        //             }
        //         }
        //     }
        // }

        return arr;
    };

    const reactantAlerts = compareReactants();
    const productAlerts = compareProducts();
    const diluentAlerts = compareDiluents();
    const srAlerts = compareSideReactions();

    // no alerts
    if (reactants.length !== 0 && products.length !== 0 && diluents.length !== 0 && sideReactions.length !== 0) return null;

    return (
        <div className="Alert" style={style.main}>
            <h4>Alerts</h4>

            { reactantAlerts.length !== 0
            && (
                <React.Fragment key={key++}>
                    <br />
                    <div>Reactant Alerts</div>
                </React.Fragment>
            )}
            {reactantAlerts}

            { productAlerts.length !== 0
            && (
                <React.Fragment key={key++}>
                    <br />
                    <div>Product Alerts</div>
                </React.Fragment>
            )}
            {productAlerts}

            { diluentAlerts.length !== 0
            && (
                <React.Fragment key={key++}>
                    <br />
                    <div>Diluent Alerts</div>
                </React.Fragment>
            )}
            {diluentAlerts}

            { srAlerts.length !== 0
            && (
                <React.Fragment key={key++}>
                    <br />
                    <div>Process Alerts</div>
                </React.Fragment>
            )}
            {srAlerts}

        </div>
    );
};

const style = {
    main: {
        padding: '1rem',
        paddingTop: '2rem',
        width: '100vw',
        textAlign: 'center',
    },

    alert: {
        color: '#c71e1e',
    },
};

export default Alert;
