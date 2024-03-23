import { isUndefined, debounce } from 'lodash';
import { useToggle } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useRef } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, Input, Label, Container, Button, Tooltip } from "reactstrap";
import { Equation, PACParams, RheactState } from "model";
import { PRESSURE_UNITS_LIST, PAC_PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from 'units'
import { 
    SET_PAC_CHEMICAL, 
    SET_PAC_CHAMICAL_CASNO, 
    SET_PAC_AQ, SET_PAC_AQKNOWN, 
    SET_PAC_TYPE_OF_RELEASE, 
    SET_PAC_DIAMETER, 
    SET_PAC_Toxicity_RATING,
    SET_PAC_PRESSURE,
    SET_PAC_PRESSURE_UNIT, 
    SET_PAC_OPERATING_TEMP,
    SET_PAC_OPERATING_TEMP_UNIT,
    SET_PAC_LIQUID_HEIGHT,
    SET_PAC_DENSITY,
    SET_PAC_VAPOR_PRESSURE,
    SET_PAC_VAPOR_PRESSURE_UNIT,
    SET_PAC_HOV,
    SET_PAC_HEAT_CAPACITY,
    SET_PAC_BOILING_POINT,
    SET_PAC_MW,
    SET_PAC_DIKED_AREA,
    SET_PAC_IS_DA,
    SET_PAC_USE_TA,
    SET_PAC_TOTAL_AMOUNT,
    SET_PAC_OPEN_TANK,
    SET_PAC_SHOW_HOV,
    SET_PAC_SHOW_HC,
    SET_PAC_SHOW_BP,
    SET_PAC_SHOW_MW,
    SET_PAC_SHOW_CUT_OFF
} from "store";
import server from "api";

import './style.css'

const PACPage = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState, Equation>(state => state.compound)
    const PACParams = useSelector<RheactState, PACParams>(state => state.pacParams)

    const debouncedCallback = useRef<undefined | ReturnType<typeof debounce>>()

    const [chemPresent, setChemPresent] = useState<boolean>(false)
    const [PAC2, setPAC2] = useState<string>('')
    const [pacMW, setPACMW] = useState<string>('')
    const [pacBP, setPACBP] = useState<string>('')
    const [liqRASTCp, setLiqRASTCp] = useState<string>('')
    const [crcHOV, setCRCHOV] = useState<string>('')
    const [rastHOV, setRASTHOV] = useState<string>('')
    const [poolTemp, setPoolTemp] = useState<string>('')
    const [pacVPTemp, setPACVPTemp] = useState<string>('')
    const [pacVP, setPACVP] = useState<string>('')
    const [rastVP, setRASTVP] = useState<string>('')
    const [RASTBoilingPoint, setRASTBoilingPoint] = useState<string>('')
    const [pacLiquidDensity, setPACLiquidDensity] = useState<string>('')
    const [chemLiquidDensity, setChemLiquidDensity] = useState<string>('')
    const [pacLiquidReleaseRate, setPACliquidReleaseRate] = useState<string>('')

    const [openTooltip, toggleTooltip] = useToggle(false);
    const [openPressure, togglePressure] = useToggle(false)
    const [openVPressure, toggleVPressure] = useToggle(false)
    const [openTemp, toggleTemp] = useToggle(false)
    const [viewAQTooltip, toggleAQTooltip] = useToggle(false);
    const [viewGasPTooltip, toggleGasPTooltip] = useToggle(false);
    const [viewGasTempTooltip, toggleGasTempTooltip] = useToggle(false);
    const [viewLiqExpTooltip, toggleLiqExpTooltip] = useToggle(false);
    const [viewLiqDensityTooltip, toggleLiqDensityTooltip] = useToggle(false);
    const [viewLiq15Tooltip, toggleLiq15Tooltip] = useToggle(false);
    const [viewOpTempTooltip, toggleOpTempTooltip] = useToggle(false);
    const [viewLiqCpTooltip, toggleLiqCpTooltip] = useToggle(false);
    const [viewLiqHOVTooltip, toggleLiqHOVTooltip] = useToggle(false);
    const [viewLiqVPTooltip, toggleLiqVPTooltip] = useToggle(false);

    const onPrint = useCallback(() => {
        window.print();
    }, []);

    const onSelect = useCallback((unit: string, unitAction) => {
        dispatch(unitAction(unit))
        fetchVaporPressure(PACParams.chemicalCasNo, PACParams.operatingTemp, unit, PACParams.boilingPoint)
        if (debouncedCallback.current) {
            debouncedCallback.current(PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.boilingPoint)
        }
    }, [PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.boilingPoint])

    const handleToggle = useCallback((toggle, open) => {
        toggle(!open)
    }, [])

    const clearLiquidRelatedFields = useCallback(() => {
        dispatch(SET_PAC_OPEN_TANK(undefined))
        dispatch(SET_PAC_PRESSURE(''))
        dispatch(SET_PAC_PRESSURE_UNIT(PAC_PRESSURE_UNITS_LIST[0]))
        dispatch(SET_PAC_USE_TA(undefined))
        dispatch(SET_PAC_TOTAL_AMOUNT(''))
        dispatch(SET_PAC_LIQUID_HEIGHT(''))
        dispatch(SET_PAC_IS_DA(undefined))
        dispatch(SET_PAC_DIKED_AREA(''))
        dispatch(SET_PAC_DENSITY(''))
        dispatch(SET_PAC_SHOW_BP(undefined))
        dispatch(SET_PAC_BOILING_POINT(''))
        dispatch(SET_PAC_SHOW_HC(undefined))
        dispatch(SET_PAC_HEAT_CAPACITY(''))
        dispatch(SET_PAC_SHOW_HOV(undefined))
        dispatch(SET_PAC_HOV(''))
        dispatch(SET_PAC_VAPOR_PRESSURE(''))
        dispatch(SET_PAC_VAPOR_PRESSURE_UNIT(PRESSURE_UNITS_LIST[0]))
    }, [])

    const clearAllValues = useCallback(() => {
        dispatch(SET_PAC_TYPE_OF_RELEASE(''))
        dispatch(SET_PAC_OPEN_TANK(undefined))
        dispatch(SET_PAC_PRESSURE(''))
        dispatch(SET_PAC_PRESSURE_UNIT(PAC_PRESSURE_UNITS_LIST[0]))
        dispatch(SET_PAC_OPERATING_TEMP(''))
        dispatch(SET_PAC_OPERATING_TEMP_UNIT(TEMPERATURE_UNITS_LIST[0]))
        dispatch(SET_PAC_USE_TA(undefined))
        dispatch(SET_PAC_TOTAL_AMOUNT(''))
        dispatch(SET_PAC_DIAMETER(''))
        dispatch(SET_PAC_LIQUID_HEIGHT(''))
        dispatch(SET_PAC_IS_DA(undefined))
        dispatch(SET_PAC_DIKED_AREA(''))
        dispatch(SET_PAC_SHOW_BP(undefined))
        dispatch(SET_PAC_BOILING_POINT(''))
        dispatch(SET_PAC_SHOW_HC(undefined))
        dispatch(SET_PAC_HEAT_CAPACITY(''))
        dispatch(SET_PAC_SHOW_HOV(undefined))
        dispatch(SET_PAC_HOV(''))
        dispatch(SET_PAC_VAPOR_PRESSURE(''))
        dispatch(SET_PAC_VAPOR_PRESSURE_UNIT(PRESSURE_UNITS_LIST[0]))
        dispatch(SET_PAC_DENSITY(''))
        dispatch(SET_PAC_SHOW_CUT_OFF(false))
        dispatch(SET_PAC_Toxicity_RATING(''))
        setChemPresent(false)
        setPAC2('')
        setPACMW('')
        setPACBP('')
        setLiqRASTCp('')
        setCRCHOV('')
        setRASTHOV('')
        setPoolTemp('')
        setPACVPTemp('')
        setPACVP('')
        setRASTVP('')
        setRASTBoilingPoint('')
        setPACLiquidDensity('')
        setChemLiquidDensity('')
        setPACliquidReleaseRate('')
    }, [])

    const clearRating = useCallback(() => {
        dispatch(SET_PAC_SHOW_CUT_OFF(false))
        dispatch(SET_PAC_Toxicity_RATING(''))
    }, [])

    const fetchVaporPressure = useCallback((casNo, opTemp, opTempUnit, boilingPoint) => {
        server
        .fetchVaporPressure(casNo, opTemp, opTempUnit, boilingPoint)
        .then((res) => {
            let values = JSON.parse(res.data);
            if (values[0] != "No record in the database.") {
                setPACVP(values[0])
                setPACVPTemp(values[1])
            }
            if (values[2] != "No record in the database.") {
                setRASTVP(values[2])
                setPoolTemp(values[3])
            }
        })
    }, [])

    const fetchLiquidDensity = useCallback((casNo, temp, tempUnit) => {
        server
        .fetchLiquidDensity(casNo, temp, tempUnit)
        .then((res) => {
            if (res.data != 'null') {
                let strs = res.data.split('"')
                if (strs.length == 3) {
                    setPACLiquidDensity(strs[1])
                    setChemLiquidDensity('')
                }
                if (strs.length == 5) {
                    setPACLiquidDensity(strs[1])
                    setChemLiquidDensity(strs[3])
                }
            } else {
                setPACLiquidDensity('')
                setChemLiquidDensity('')
            }
        })
    }, [])

    const fetchLiquidReleaseRate = useCallback((pressure, pressureUnit, density, liquidHeight, diameter) => {
        server
        .fetchLiquidReleaseRate(pressure, pressureUnit, density, liquidHeight, diameter)
        .then((res) => {
            if (res.data != 'null') {
                setPACliquidReleaseRate(res.data)
            } else {
                setPACliquidReleaseRate("Cannot calculate liquid release rate")
            }
        })
    }, [])

    const fetchPACMolecularWeight = useCallback((casNo) => {
        server
        .fetchPACMolecularWeight(casNo)
        .then((res) => {
            if (res.data == 'Unable to find the chemical in PAC database') {
                setChemPresent(false)
            } else {
                let str = res.data.substring(1, res.data.length - 1)
                let numbers = str.split(",")
                dispatch(SET_PAC_MW(numbers[0]))
                setPACMW(numbers[0])
                setPAC2(numbers[1])
                setChemPresent(true)
            }
        })
    }, [])

    const fetchBoilingPoint = useCallback((casNo) => {
        server
        .fetchBoilingPoint(casNo)
        .then((res) => {
            let bps = JSON.parse(res.data);
            if (bps[0] != "Unable to find the chemical in PAC database") {
                dispatch(SET_PAC_BOILING_POINT(bps[0]))
                setPACBP(bps[0])
            }
            if (bps[1] != "Unable to find the chemical in RAST database") {
                setRASTBoilingPoint(bps[1])
            }
        })
    }, [])

    const fetchLiqCp = useCallback((casNo, opTemp, boilingPoint) => {
        server
        .fetchLiqCp(casNo, opTemp, boilingPoint)
        .then((res) => {
            if (res.data != '"Unable to calculate heat capacity from RAST."') {
                console.log('wtf')
                dispatch(SET_PAC_HEAT_CAPACITY(res.data))
                setLiqRASTCp(res.data)
            }
        })
    }, [])

    const fetchLiqHOV = useCallback((casNo, molecularWeight, boilingPoint) => {
        server
        .fetchLiqHOV(casNo, molecularWeight, boilingPoint)
        .then((res) => {
            let hovs = JSON.parse(res.data);
            if (hovs[0] != "Unable to calculate HOV") {
                setCRCHOV(hovs[0])
            }
            if (hovs[1] != "Unable to calculate HOV") {
                dispatch(SET_PAC_HOV(hovs[1]))
                setRASTHOV(hovs[1])
            }
        })
    }, [])

    const calculateToxicityRating = useCallback(() => {
        if(PACParams.chemical) {
            server
            .getPACToxicityRating(PACParams.chemicalCasNo || '', PACParams.AQ || '', PACParams.typeOfRelease || '', 
                PACParams.operatingTemp || '', PACParams.operatingTempUnit || '', PACParams.openTank ? '101.3' : PACParams.pressure || '', 
                PACParams.openTank ? 'kPa' : PACParams.pressureUnit || '', PACParams.diameter || '', 
                PACParams.chemical?.molWt || PACParams.molecularWeight || '', PACParams.density || '', 
                PACParams.liquidHeight || '', PACParams.boilingPoint || '', PACParams.heatCapacity || '', 
                PACParams.HOV || '', PACParams.vaporPressure || '', 
                PACParams.vaporPressureUnit || '', PACParams.dikedArea || '', PACParams.totalAmount || '')
            .then((res) => {
                dispatch(SET_PAC_Toxicity_RATING(res.data))
                dispatch(SET_PAC_SHOW_CUT_OFF(true))
            })
        }
    }, [PACParams])

    const changeChemicalCasNo = useCallback((newCasNo) => {
        dispatch(SET_PAC_CHAMICAL_CASNO(newCasNo))
        if(!newCasNo) {
            clearAllValues()
        }
        let chem = equation.reactants.filter(reactant => reactant.casNo == newCasNo)
        if(chem.length == 0) {
            chem = equation.products.filter(product => product.casNo == newCasNo)
        }
        if(chem.length == 0) {
            chem = equation.diluents.filter(diluent => diluent.casNo == newCasNo)
        }
        if(chem.length == 1) {
            dispatch(SET_PAC_CHEMICAL(chem[0]))
            dispatch(SET_PAC_SHOW_HC(false))
            dispatch(SET_PAC_HEAT_CAPACITY(''))
            dispatch(SET_PAC_SHOW_HOV(false))
            dispatch(SET_PAC_HOV(''))
            dispatch(SET_PAC_SHOW_BP(false))
            dispatch(SET_PAC_BOILING_POINT(''))
            dispatch(SET_PAC_SHOW_MW(false))
            dispatch(SET_PAC_MW(''))
            clearRating()
        }
    }, [equation])

    debouncedCallback.current = useCallback(
        debounce((opTemp, boilingPoint) => {
            if (!opTemp || !boilingPoint) {
                return
            }
            
            if (PACParams.operatingTempUnit) {
                if (PACParams.operatingTempUnit == '°F') {
                    opTemp = (opTemp - 32) * 5 / 9
                }
                if (PACParams.operatingTempUnit == 'K') {
                    opTemp = opTemp - 273.15
                }
            }
 
            if (parseFloat(boilingPoint) < parseFloat(opTemp)) {
                // show cp & hov
                dispatch(SET_PAC_SHOW_HC(true))
                dispatch(SET_PAC_SHOW_HOV(true))
                fetchLiqCp(PACParams.chemicalCasNo, opTemp, boilingPoint)
                fetchLiqHOV(PACParams.chemicalCasNo, PACParams.molecularWeight, boilingPoint)
            }
        }, 500),
        [PACParams.chemicalCasNo, PACParams.operatingTempUnit]
    )

    const handleBPChange = useCallback((newBP) => {
        dispatch(SET_PAC_BOILING_POINT(newBP))
        fetchVaporPressure(PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.operatingTempUnit, newBP)
        if (debouncedCallback.current) {
            debouncedCallback.current(PACParams.operatingTemp, newBP)
        }
    }, [PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.operatingTempUnit])

    const handleOpTempChange = useCallback((newOpTemp) => {
        dispatch(SET_PAC_OPERATING_TEMP(newOpTemp))
        fetchVaporPressure(PACParams.chemicalCasNo, newOpTemp, PACParams.operatingTempUnit, PACParams.boilingPoint)
        if (debouncedCallback.current) {
            debouncedCallback.current(newOpTemp, PACParams.boilingPoint)
        }
    }, [PACParams.chemicalCasNo, PACParams.boilingPoint, PACParams.operatingTempUnit])

    const handleOnKeyDown = useCallback((e) => {
        if(e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
    }, [])

    return (
        <>
        <div className="w-100 d-flex align-items-center p-2" style={{ backgroundColor: 'white' }}>
            <Button color="primary" className="ms-1" onClick={onPrint}>
                <i className="bi bi-printer-fill me-1" />
                Print
            </Button>
        </div>
        <Container className="pac-page pac-printable">
            <div className='title-wrapper'>
                <h2>Protective Action Criteria (PAC) Toxicity Rating</h2>
            </div>
            <div id='pac-desc'>
                The Protective Action Criteria (PAC) Toxicity Rating provides a simple and standardized method of rating the relative acute 
                health hazard potential to people at the plant and for people in neighboring plants or communities from possible chemical release 
                incidents. It is used for
                <ul className='pac-ul'>
                    <li>
                        Conducting an initial Process Hazard Analysis
                    </li>
                    <li>
                        Making recommendations for eliminating, reducing or mitigating releases
                    </li>
                    <li>
                        Planning emergency responses
                    </li>
                </ul>
                The PAC Toxicity Rating was adapted from the published DOW’s Chemical Exposure Index (<a target="_blank" href="CEI.pdf">CEI</a>). 
                Unlike the DOW CEI which relies on ERPG-2, the PAC Toxicity Rating depends on published PAC-2 values.
                Read more about PAC <a target="_blank" href="https://www.energy.gov/ehss/protective-action-criteria-pac-aegls-erpgs-teels">here</a>.
                See the detailed user guide for how to use this tool. The rating is calculated based on the Airborne Quantity (AQ) of the chemical release and the PAC-2 values 
                (i.e., toxic chemical exposure level that lead to irreversible or other serious, long-lasting health effects that could impair the ability to take protective action or escape). 
                For unknown AQ, this tool guides a user in calculating the AQ for four cases:
                <ul className='pac-ul'>
                    <li>Gas.</li>
                    <li>Liquid that doesn't flash (i.e., only pool evaporation).</li>
                    <li>Liquid that partially flashes to vapor (unflashed portion undergoes pool evaporation).</li>
                    <li>Liquid that fully flashes to vapor.</li>
                </ul>
            </div>
            <div className='pac-chemical-selector'>
                <div>Select a chemical to start the evaluation</div>
                <InputGroup>
                <Input
                    type='select'
                    invalid={!PACParams || !PACParams.chemicalCasNo || !/^\d{2,7}-\d{2}-\d$/.test(PACParams.chemicalCasNo)}
                    value={PACParams.chemicalCasNo}
                    onChange={e => {
                        changeChemicalCasNo(e.target.value)
                        if (PACParams.typeOfRelease === 'Liquid') {
                            fetchVaporPressure(e.target.value, PACParams.operatingTemp, PACParams.operatingTempUnit, PACParams.boilingPoint)
                            fetchLiquidDensity(e.target.value, PACParams.operatingTemp, PACParams.operatingTempUnit)
                        }
                        if (e.target.value) {
                            fetchPACMolecularWeight(e.target.value)
                        }
                    }}
                >
                    <option key='' value={undefined}></option>  
                    {equation.reactants.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                    {equation.products.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                    {equation.diluents.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                </Input>
                <div className="invalid-feedback">
                    { PACParams.chemical ? "Please select a chemical" : "Ensure that the CASRN is entered properly during the SDS upload"}
                </div>
                </InputGroup>
                { PACParams.chemicalCasNo && /^\d{2,7}-\d{2}-\d$/.test(PACParams.chemicalCasNo) && <div className='pac-cell custom-alert'>The CAS Registry No. is {PACParams.chemicalCasNo}</div>}
            </div>
            { PACParams.chemicalCasNo && (
                <div className="pac-questions">
                    <div>
                    <div className={'pac-cell'}>
                            <div>Molecular weight of the chemical (unit: g/mol)</div>
                            <div className="pac-answers">
                            <InputGroup>
                                <Input 
                                    type="number" 
                                    value={PACParams.molecularWeight}
                                    invalid={!PACParams.molecularWeight || parseFloat(PACParams.molecularWeight) <= 0}
                                    onWheel={e => e.currentTarget.blur()}
                                    onKeyDown={e => handleOnKeyDown(e)}
                                    onChange={e => {
                                        dispatch(SET_PAC_MW(e.target.value))
                                        if (e.target.value && PACParams.boilingPoint) {
                                            fetchLiqHOV(PACParams.chemicalCasNo, e.target.value, PACParams.boilingPoint)
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Molecular weight must be a positive number!
                                </div>
                            </InputGroup>
                            </div>
                        </div>
                        <div className='pac-cell custom-alert'>Molecular weight from PAC database is {pacMW ? pacMW + " g/mol" : "not available."}</div>
                        <div className='pac-cell custom-alert'>Molecular weight from SDS is {PACParams.chemical?.molWt ? PACParams.chemical?.molWt + " g/mol" : "not available."}</div>
                        {
                            PAC2 && <div className='pac-cell custom-alert'>PAC-2 value from database is {PAC2} mg/m&#179;.</div>
                        }
                        {
                            !chemPresent && <div className='pac-cell custom-alert'>Using the CAS RN, the chemical was not found in the PAC database. The current tool is limited to analysis of chemical releases of the 3146 chemicals in the published PAC database. See Dow CEI for cases where toxic levels of concern are unavailable.</div>
                        }
                        <div className={'pac-cell'}>
                            <div>
                            <span>Airborne quantity (AQ) known?</span>
                                <i style={{marginLeft: "10px"}} id="aq-known" className="bi bi-question-circle"></i>
                                <Tooltip
                                    style={{textTransform: "none"}}
                                    placement="top"
                                    isOpen={viewAQTooltip}
                                    target="aq-known"
                                    toggle={toggleAQTooltip}
                                >
                                    AQ is the mass flow rate of the chemical entering the atmosphere either as (i) vapor or (ii) liquid before flashing or pool evaporation.
                                </Tooltip>
                             </div>
                            <div className="pac-answers">
                                <Input
                                    name="AQ"
                                    type="radio"
                                    checked={PACParams.AQKnown}
                                    onChange={(e) => {
                                        if(e.target.checked) {
                                            dispatch(SET_PAC_AQKNOWN(true))
                                            clearAllValues()
                                        }
                                    }}
                                />
                                {' '}
                                <Label check className="pac-radio-label">
                                    Yes
                                </Label>
                                <Input
                                    name="AQ"
                                    type="radio"
                                    checked={!isUndefined(PACParams.AQKnown) && !PACParams.AQKnown}
                                    onChange={(e) => {
                                        if(e.target.checked) {
                                            dispatch(SET_PAC_AQKNOWN(false))
                                            dispatch(SET_PAC_AQ(''))
                                        }
                                    }}
                                />
                                {' '}
                                <Label check>
                                    No
                                </Label>
                            </div>
                        </div>
                        { PACParams.AQKnown && (
                                <div className={'pac-cell'}>
                                    <Label>
                                        Airborne Quantity (unit: kg/s):
                                    </Label>
                                    <Input 
                                        type="number" 
                                        value={PACParams.AQ}
                                        onWheel={e => e.currentTarget.blur()}
                                        onKeyDown={e => handleOnKeyDown(e)}
                                        onChange={e => dispatch(SET_PAC_AQ(e.target.value))}
                                    />
                                </div>
                        )
                        }
                        { !isUndefined(PACParams.AQKnown) && !PACParams.AQKnown && (
                            <>
                                <div className={'pac-cell'}>
                                    <div>Type of release:</div>
                                    <div className="pac-answers">
                                        <Input
                                            name="typeOfRelease"
                                            type="radio"
                                            checked={PACParams.typeOfRelease == 'Gas'}
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    dispatch(SET_PAC_TYPE_OF_RELEASE('Gas'))
                                                    clearRating()
                                                    clearLiquidRelatedFields()
                                                }
                                            }}
                                        />
                                        {' '}
                                        <Label check className="pac-radio-label">
                                            Gas
                                        </Label>
                                        <Input
                                            name="typeOfRelease"
                                            type="radio"
                                            checked={PACParams.typeOfRelease == 'Liquid'}
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    dispatch(SET_PAC_TYPE_OF_RELEASE('Liquid'))
                                                    fetchLiquidDensity(PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.operatingTempUnit)
                                                    fetchBoilingPoint(PACParams.chemicalCasNo)
                                                    clearRating()
                                                }
                                            }}
                                        />
                                        {' '}
                                        <Label check>
                                            Liquid
                                        </Label>
                                    </div>
                                </div>
                                {
                                    PACParams.typeOfRelease == 'Gas' && (
                                        <>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Pressure:
                                                    <i style={{marginLeft: "10px"}} id="gas-pressure" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewGasPTooltip}
                                                        target="gas-pressure"
                                                        toggle={toggleGasPTooltip}
                                                    >
                                                        This is the pressure of the gas in the storage vessel or transport pipe that is leaking.
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.pressure}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.pressure || !PACParams.pressureUnit}
                                                        onChange={e => dispatch(SET_PAC_PRESSURE(e.target.value))}
                                                    />
                                                    <ButtonDropdown isOpen={openPressure} toggle={() => handleToggle(togglePressure, openPressure)}>
                                                        <DropdownToggle caret>
                                                            {PACParams.pressureUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {PAC_PRESSURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, SET_PAC_PRESSURE_UNIT)}>
                                                                    {u}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                    <div className="invalid-feedback">
                                                        Pressure and its unit cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Diameter of hole that the gas is releasing through (unit: mm):
                                                </Label>
                                                <i style={{marginLeft: "10px"}} id="diameterHint" className="bi bi-question-circle"></i>
                                                <Tooltip
                                                    style={{textTransform: "none", maxWidth: "400px", textAlign: "start"}}
                                                    placement="top"
                                                    isOpen={openTooltip}
                                                    autohide={false}
                                                    target="diameterHint"
                                                    toggle={toggleTooltip}
                                                >
                                                    <div>
                                                        1. PROCESS PIPES
                                                        <div>
                                                            Rupture of the largest diameter process pipe as follows:
                                                            <ul>
                                                                <li>For smaller than 2-inch diameter - full bore rupture</li>
                                                                <li>For 2- through 4-inch diameter - rupture equal to that of 2-inch diameter pipe</li>
                                                                <li>For greater than 4-inch diameter - rupture area equal to 20% of pipe cross section area</li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            2. HOSES
                                                            <div>
                                                                Full bore rupture
                                                            </div>
                                                        </div>
                                                        <div>
                                                            3. PRESSURE RELIEF DEVICES RELIEVING DIRECTLY TO THE ATMOSPHERE
                                                            <div>
                                                                Calculated total release rate at set pressure. Refer to pressure relief calculation or contact process 
                                                                engineering. All material released is assumed to be airborne.
                                                            </div>
                                                        </div>
                                                        <div>
                                                            4. VESSELS
                                                            <div>
                                                                Rupture based on largest diameter process pipe attached to the vessel using pipe criteria above.
                                                            </div>
                                                        </div>
                                                        <div>5. TANK OVERFLOWS AND SPILLS</div>
                                                        <div>
                                                            6. OTHERS
                                                            <div>
                                                                Scenarios can be established based on the plant's or technology's experience, they can be the 
                                                                outcome of a review or derived from hazard analysis studies. They can also be based on the
                                                                experience of another technology if the event could occur in this unit. Contact Process
                                                                Engineering for special cases that may include reactivity or mixtures.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.diameter}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.diameter || parseFloat(PACParams.diameter) <= 0}
                                                        onChange={e => dispatch(SET_PAC_DIAMETER(e.target.value))}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Diameter must be a positive number!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Gas Temperature:
                                                    <i style={{marginLeft: "10px"}} id="gas-temp" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewGasTempTooltip}
                                                        target="gas-temp"
                                                        toggle={toggleGasTempTooltip}
                                                    >
                                                        This is the temperature of the gas in the storage tank or transport pipe that is leaking.
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.operatingTemp}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.operatingTemp || !PACParams.operatingTempUnit}
                                                        onChange={e => dispatch(SET_PAC_OPERATING_TEMP(e.target.value))}
                                                    />
                                                    <ButtonDropdown isOpen={openTemp} toggle={() => {handleToggle(toggleTemp, openTemp)}}>
                                                        <DropdownToggle caret>
                                                            {PACParams.operatingTempUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {TEMPERATURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, SET_PAC_OPERATING_TEMP_UNIT)}>
                                                                    {u}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                    <div className="invalid-feedback">
                                                        Gas temperature and its unit cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            {
                                                PACParams.showMW && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Molecular Weight (unit: g/mol):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={PACParams.molecularWeight}
                                                                onWheel={e => e.currentTarget.blur()}
                                                                onKeyDown={e => handleOnKeyDown(e)}
                                                                invalid={!PACParams.molecularWeight || parseFloat(PACParams.molecularWeight) <= 0}
                                                                onChange={e => dispatch(SET_PAC_MW(e.target.value))}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Molecular weight must be a positive number!
                                                            </div>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                                {
                                    PACParams.typeOfRelease == 'Liquid' && (
                                        <>
                                            <div className={'pac-cell'}>
                                                <div>
                                                    <span>Is the container exposed to atmosphere?</span>
                                                    <i style={{marginLeft: "10px"}} id="liq-exposure" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewLiqExpTooltip}
                                                        target="liq-exposure"
                                                        toggle={toggleLiqExpTooltip}
                                                    >
                                                        Pressure inside vessel or pipe will be set to atmospheric pressure if the container is exposed to atmosphere
                                                    </Tooltip>
                                                </div>
                                                <div className="pac-answers">
                                                    <Input
                                                        name="openTank"
                                                        type="radio"
                                                        checked={PACParams.openTank}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_OPEN_TANK(true))
                                                                dispatch(SET_PAC_PRESSURE(''))
                                                                dispatch(SET_PAC_PRESSURE_UNIT(PAC_PRESSURE_UNITS_LIST[0]))
                                                            }
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check className="pac-radio-label">
                                                        Yes
                                                    </Label>
                                                    <Input
                                                        name="openTank"
                                                        type="radio"
                                                        checked={!isUndefined(PACParams.openTank) && !PACParams.openTank}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_OPEN_TANK(false))
                                                            }
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check>
                                                        No
                                                    </Label>
                                                </div>
                                            </div>
                                            {
                                                !isUndefined(PACParams.openTank) && !PACParams.openTank && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Pressure inside vessel or pipe:
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={PACParams.pressure}
                                                                onWheel={e => e.currentTarget.blur()}
                                                                onKeyDown={e => handleOnKeyDown(e)}
                                                                invalid={!PACParams.pressure || !PACParams.pressureUnit}
                                                                onChange={e => dispatch(SET_PAC_PRESSURE(e.target.value))}
                                                            />
                                                            <ButtonDropdown isOpen={openPressure} toggle={() => handleToggle(togglePressure, openPressure)}>
                                                                <DropdownToggle caret>
                                                                    {PACParams.pressureUnit}
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    {PAC_PRESSURE_UNITS_LIST.map((u) => (
                                                                        <DropdownItem onClick={() => onSelect(u, SET_PAC_PRESSURE_UNIT)}>
                                                                            {u}
                                                                        </DropdownItem>
                                                                    ))}
                                                                </DropdownMenu>
                                                            </ButtonDropdown>
                                                            <div className="invalid-feedback">
                                                                Pressure and its unit cannot be empty!
                                                            </div>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            }
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Diameter of hole the liquid is releasing through (unit: mm):
                                                    <i style={{marginLeft: "10px"}} id="diameterHint" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none", maxWidth: "400px", textAlign: "start"}}
                                                        placement="top"
                                                        isOpen={openTooltip}
                                                        autohide={false}
                                                        target="diameterHint"
                                                        toggle={toggleTooltip}
                                                    >
                                                        <div>
                                                            1. PROCESS PIPES
                                                            <div>
                                                                Rupture of the largest diameter process pipe as follows:
                                                                <ul>
                                                                    <li>For smaller than 2-inch diameter - full bore rupture</li>
                                                                    <li>For 2- through 4-inch diameter - rupture equal to that of 2-inch diameter pipe</li>
                                                                    <li>For greater than 4-inch diameter - rupture area equal to 20% of pipe cross section area</li>
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                2. HOSES
                                                                <div>
                                                                    Full bore rupture
                                                                </div>
                                                            </div>
                                                            <div>
                                                                3. PRESSURE RELIEF DEVICES RELIEVING DIRECTLY TO THE ATMOSPHERE
                                                                <div>
                                                                    Calculated total release rate at set pressure. Refer to pressure relief calculation or contact process 
                                                                    engineering. All material released is assumed to be airborne.
                                                                </div>
                                                            </div>
                                                            <div>
                                                                4. VESSELS
                                                                <div>
                                                                    Rupture based on largest diameter process pipe attached to the vessel using pipe criteria above.
                                                                </div>
                                                            </div>
                                                            <div>5. TANK OVERFLOWS AND SPILLS</div>
                                                            <div>
                                                                6. OTHERS
                                                                <div>
                                                                    Scenarios can be established based on the plant's or technology's experience, they can be the 
                                                                    outcome of a review or derived from hazard analysis studies. They can also be based on the
                                                                    experience of another technology if the event could occur in this unit. Contact Process
                                                                    Engineering for special cases that may include reactivity or mixtures.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.diameter}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.diameter || parseFloat(PACParams.diameter) <= 0}
                                                        onChange={e => dispatch(SET_PAC_DIAMETER(e.target.value))}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Diameter must be a positive number!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Height of liquid above release point (unit: m):
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.liquidHeight}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.liquidHeight || parseFloat(PACParams.liquidHeight) <= 0}
                                                        onChange={e => dispatch(SET_PAC_LIQUID_HEIGHT(e.target.value))}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Height of liquid must be a positive number!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Density of liquid at operating temperature (unit: kg/m&#179;):
                                                    <i style={{marginLeft: "10px"}} id="liq-density" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewLiqDensityTooltip}
                                                        target="liq-density"
                                                        toggle={toggleLiqDensityTooltip}
                                                    >
                                                        Ensure that you are using only the density of the liquid at the operating temperature or at the boiling point temperature. Do not use the density of the gas. Note that 1000 g/L = 1 g/cm&sup3; = 1 g/mL= 1 kg/L = 1000 kg/m&sup3; and the specific gravity or relative density is normalized by density of air at 20&deg; (1.2 kg/m&sup3;) for gases or by density of water at 4&deg; (1000 kg/m&sup3;) for liquids and solids.
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.density}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.density || parseFloat(PACParams.density) < 0}
                                                        onChange={e => dispatch(SET_PAC_DENSITY(e.target.value))}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Liquid density must be a positive number!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            {
                                                PACParams.chemical && (
                                                    <div className='pac-cell custom-alert'>
                                                        Relative density from SDS: {PACParams.chemical.relDensity || 'No data available'}
                                                    </div>
                                                )
                                            }
                                            {
                                                pacLiquidDensity && (
                                                    <div className='pac-cell custom-alert'>
                                                        {pacLiquidDensity}
                                                        <div>
                                                        (Specific gravity is relative to air (density 1000 kg/&#13221;) for gases and to water (denisty 1kg/&#13221;) for liquids and solids)
                                                        </div>
                                                    </div>
                                                )
                                                
                                            }
                                            <div className='pac-cell custom-alert'>Liquid density from the RAST chemical database is {chemLiquidDensity ? chemLiquidDensity + " g/mL" : "not available."}</div>
                                            <Button className="green-btn" onClick={() => fetchLiquidReleaseRate(PACParams.openTank ? '101.3' : PACParams.pressure || '', PACParams.openTank ? 'kPa' : PACParams.pressureUnit || '', PACParams.density, PACParams.liquidHeight, PACParams.diameter)}>
                                                Show the calculated liquid release rate
                                            </Button>
                                            {
                                                pacLiquidReleaseRate && <div style={{"marginTop": "5px"}}>Calculated liquid release rate: {Number(parseFloat(pacLiquidReleaseRate).toFixed(5))} kg/s</div>
                                            }
                                            <div className={'pac-cell'}>
                                                <div>
                                                    Is all liquid released in greater than 15 mins?
                                                    <i style={{marginLeft: "10px"}} id="liq-15" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewLiq15Tooltip}
                                                        target="liq-15"
                                                        toggle={toggleLiq15Tooltip}
                                                    >
                                                        For releases less than 15 minutes, the total liquid released is the taken to be the total amount of liquid in the vessel or pipe; otherwise, the total amount of liquid released is estimated using the calculated release rate and a release time of 15 minutes before it can be stopped.
                                                    </Tooltip>
                                                </div>
                                                <div className="pac-answers">
                                                    <Input
                                                        name="releaseMins"
                                                        type="radio"
                                                        checked={!isUndefined(PACParams.useTotalAmount) && !PACParams.useTotalAmount}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_USE_TA(false))
                                                                dispatch(SET_PAC_TOTAL_AMOUNT(''))
                                                            }
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check className="pac-radio-label">
                                                        Yes
                                                    </Label>
                                                    <Input
                                                        name="releaseMins"
                                                        type="radio"
                                                        checked={PACParams.useTotalAmount}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_USE_TA(true))
                                                            }
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check>
                                                        No
                                                    </Label>
                                                </div>
                                            </div>
                                            {
                                                PACParams.useTotalAmount && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Total amount of liquid in the container (unit: kg):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={PACParams.totalAmount}
                                                                onWheel={e => e.currentTarget.blur()}
                                                                onKeyDown={e => handleOnKeyDown(e)}
                                                                invalid={!PACParams.totalAmount || parseFloat(PACParams.totalAmount) <= 0}
                                                                onChange={e => dispatch(SET_PAC_TOTAL_AMOUNT(e.target.value))}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Total amount of the liquid must be a positive number!
                                                            </div>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            }
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Operating Temperature
                                                    <i style={{marginLeft: "10px"}} id="op-temp" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewOpTempTooltip}
                                                        target="op-temp"
                                                        toggle={toggleOpTempTooltip}
                                                    >
                                                        This is the temperature of the liquid inside the vessel or pipe.
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.operatingTemp}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.operatingTemp || !PACParams.operatingTempUnit}
                                                        onChange={e => handleOpTempChange(e.target.value)}
                                                    />
                                                    <ButtonDropdown isOpen={openTemp} toggle={() => {handleToggle(toggleTemp, openTemp)}}>
                                                        <DropdownToggle caret>
                                                            {PACParams.operatingTempUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {TEMPERATURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, SET_PAC_OPERATING_TEMP_UNIT)}>
                                                                    {u}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                    <div className="invalid-feedback">
                                                        Operating temperature and its unit cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Boiling point of liquid (unit &deg;C)
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.boilingPoint}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.boilingPoint}
                                                        onChange={e => handleBPChange(e.target.value)}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Boiling point cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className='pac-cell custom-alert'>Boiling point from PAC database is {pacBP ? pacBP + " °C" : "not available."}</div>
                                            <div className='pac-cell custom-alert'>Boiling point from SDS is {PACParams.chemical?.boilingPt ? PACParams.chemical?.boilingPt + " °C" : "not available."}</div>
                                            <div className='pac-cell custom-alert'>Boiling point from the RAST chemical database is {RASTBoilingPoint ? RASTBoilingPoint + " °C" : "not available."}</div>
                                            <div className='pac-cell custom-alert'>No liquid is flashed if the operating temperature of the liquid is less than the normal boiling point of the liquid; otherwise the flashed fraction will be calculated.</div>
                                            {
                                                PACParams.showHC && (
                                                <>
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Specific heat capacity of the liquid at the average temperature of the operating temperature and boiling point of the liquid (unit: J/kg/&deg;C):
                                                        <i style={{marginLeft: "10px"}} id="liq-cp" className="bi bi-question-circle"></i>
                                                        <Tooltip
                                                            style={{textTransform: "none"}}
                                                            placement="top"
                                                            isOpen={viewLiqCpTooltip}
                                                            target="liq-cp"
                                                            toggle={toggleLiqCpTooltip}
                                                        >
                                                            This value can be obtained from PubChem, NIST or Engineering Toolbox.
                                                        </Tooltip>
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={PACParams.heatCapacity}
                                                            onWheel={e => e.currentTarget.blur()}
                                                            onKeyDown={e => handleOnKeyDown(e)}
                                                            invalid={(!PACParams.heatCapacity && !PACParams.HOV) || (PACParams.heatCapacity !== undefined && PACParams.heatCapacity !== "" && parseFloat(PACParams.heatCapacity) <= 0)}
                                                            onChange={e => dispatch(SET_PAC_HEAT_CAPACITY(e.target.value))}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat capacity must be a positive number!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                <div className='pac-cell custom-alert'>Specific heat capacity of the liquid from the RAST chemical database at the average temperature is {liqRASTCp ? liqRASTCp + "J/kg/°C" : "not available"}</div>
                                                </>
                                                )
                                            }
                                            {
                                                PACParams.showHOV && (
                                                <>
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Heat of vaporization capacity of the liquid at the boiling point of the liquid (unit: J/kg):
                                                        <i style={{marginLeft: "10px"}} id="liq-hov" className="bi bi-question-circle"></i>
                                                        <Tooltip
                                                            style={{textTransform: "none"}}
                                                            placement="top"
                                                            isOpen={viewLiqHOVTooltip}
                                                            target="liq-hov"
                                                            toggle={toggleLiqHOVTooltip}
                                                        >
                                                            This value can be obtained from PubChem, NIST or Engineering Toolbox.
                                                        </Tooltip>
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={PACParams.HOV}
                                                            invalid={!PACParams.HOV && !PACParams.heatCapacity}
                                                            onWheel={e => e.currentTarget.blur()}
                                                            onKeyDown={e => handleOnKeyDown(e)}
                                                            onChange={e => dispatch(SET_PAC_HOV(e.target.value))}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat of vapozation cannot be empty!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                <div className='pac-cell custom-alert'>Heat of vaporization from the RAST chemical database at the normal boiling point is {rastHOV ? rastHOV + " J/kg" : "not available."}</div>
                                                <div className='pac-cell custom-alert'>Heat of vaporization from the CRC Handbook database is {crcHOV ? crcHOV + " J/kg" : "not available."}</div>
                                                <div className='pac-cell custom-alert'>If at least one of Cp and Hv is left blank, then the tool will calculate the flashed fraction assuming a Cp/Hv ratio of 0.005 /&deg;C (220 out of 250 chemicals in the RAST chemical database have Cp/Hv ratios ranging between 0.002 /&deg;C and 0.008 /&deg;C and an average of 0.005 /&deg;C)</div>
                                                </>
                                                )
                                            }
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Is a diked area provided around the vessel or pipe
                                                </Label>
                                                <div className="pac-answers">
                                                    <Input
                                                        name="dikedArea"
                                                        type="radio"
                                                        checked={PACParams.isDikedArea}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_IS_DA(true))
                                                            }
                                                            
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check className="pac-radio-label">
                                                        Yes
                                                    </Label>
                                                    <Input
                                                        name="dikedArea"
                                                        type="radio"
                                                        checked={!isUndefined(PACParams.isDikedArea) && !PACParams.isDikedArea}
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                dispatch(SET_PAC_IS_DA(false))
                                                                dispatch(SET_PAC_DIKED_AREA(''))
                                                            }
                                                        }}
                                                    />
                                                    {' '}
                                                    <Label check>
                                                        No
                                                    </Label>
                                                </div>
                                            </div>
                                            {
                                                PACParams.isDikedArea && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Diked Area (unit: m&#178;):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={PACParams.dikedArea}
                                                                onWheel={e => e.currentTarget.blur()}
                                                                onKeyDown={e => handleOnKeyDown(e)}
                                                                invalid={!PACParams.dikedArea || parseFloat(PACParams.dikedArea) <= 0}
                                                                onChange={e => dispatch(SET_PAC_DIKED_AREA(e.target.value))}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Diked area must be a positive number!
                                                            </div>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            }
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Vapor pressure of the liquid at the pool temperature (unit: kPa):
                                                    <i style={{marginLeft: "10px"}} id="liq-vp" className="bi bi-question-circle"></i>
                                                    <Tooltip
                                                        style={{textTransform: "none"}}
                                                        placement="top"
                                                        isOpen={viewLiqVPTooltip}
                                                        target="liq-vp"
                                                        toggle={toggleLiqVPTooltip}
                                                    >
                                                        This value can be obtained from PubChem, NIST or Engineering Toolbox.
                                                    </Tooltip>
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={PACParams.vaporPressure}
                                                        onWheel={e => e.currentTarget.blur()}
                                                        onKeyDown={e => handleOnKeyDown(e)}
                                                        invalid={!PACParams.vaporPressure || !PACParams.vaporPressureUnit}
                                                        onChange={e => dispatch(SET_PAC_VAPOR_PRESSURE(e.target.value))}
                                                    />
                                                    <ButtonDropdown isOpen={openVPressure} toggle={() => handleToggle(toggleVPressure, openVPressure)}>
                                                        <DropdownToggle caret>
                                                            {PACParams.vaporPressureUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {PRESSURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, SET_PAC_VAPOR_PRESSURE_UNIT)}>
                                                                    {u}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                    <div className="invalid-feedback">
                                                        Vapor pressure and its unit cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className='pac-cell custom-alert'>Vapor pressure from PAC database is {pacVP ? pacVP + " mmHg at " + pacVPTemp + " °C" : "not available."}</div>
                                            <div className='pac-cell custom-alert'>Vapor pressure from SDS is {PACParams.chemical?.vapourPressure && PACParams.chemical.vapourPressure != "No data available" ? PACParams.chemical?.vapourPressure : "not available."}</div>
                                            <div className='pac-cell custom-alert'>Vapor pressure from RAST chemical data table is {rastVP ? rastVP + " kPa at " + poolTemp + " °C" : "not available."}</div>
                                        </>
                                    )
                                }
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="pac-rating-wrapper">
                <div>
                    <div id="pac-btn-wrapper">
                        <Button className="green-btn pac-btn" onClick={calculateToxicityRating}>
                            Calculate PAC Toxicity Rating
                        </Button>
                    </div>
                    <div>
                        {
                            PACParams.toxicityRating && (
                                <div id="pac-rating">PAC Toxicity Rating: {PACParams.toxicityRating}</div>
                            )
                        }
                    </div>
                    {
                        PACParams.showCutOff && (
                            <div id="pac-cutoff">
                                A PAC Toxicity Rating greater than 300 requires further risk review.<br/>
                                If further review is needed, complete the Chemical Exposure Review Process
                                that contains a <a target="_blank" href="ContainmentAndMitigationChecklist.pdf">Containment and Mitigation Checklist</a> 
                                &nbsp;and <a target="_blank" href="ChemicalExposureIndexReviewProcess.pdf">Review Package</a>.
                            </div>
                        )
                    }
                </div>
            </div>
        </Container>
        </>
    );
};

export default PACPage;
