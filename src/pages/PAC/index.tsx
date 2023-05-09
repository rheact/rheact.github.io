import { isUndefined } from 'lodash';
import { useToggle } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, Input, Label, Container, Button, Tooltip } from "reactstrap";
import { Equation, PACParams, RheactState } from "model";
import { PRESSURE_UNITS_LIST, PAC_PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from 'units'
import { 
    SET_PAC_CHEMICAL, 
    SET_PAC_CHAMICAL_CASNO, 
    SET_PAC_AQ, SET_PAC_AQKNOWN, 
    SET_PAC_TYPE_OF_RELEASE, 
    SET_PAC_DIAMETER, 
    SET_PAC_TOXITY_RATING,
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
    const equation = useSelector<RheactState, Equation>(state => state.compound);
    const PACParams = useSelector<RheactState, PACParams>(state => state.pacParams);

    const [pacLiquidDensity, setPACLiquidDensity] = useState<string>('')
    const [chemLiquidDensity, setChemLiquidDensity] = useState<string>('')

    const [fetchedVaporPressure, setFetchedVaporPressure] = useState<string>('')
    const [openTooltip, toggleTooltip] = useToggle(false);
    const [openPressure, togglePressure] = useToggle(false)
    const [openVPressure, toggleVPressure] = useToggle(false)
    const [openTemp, toggleTemp] = useToggle(false)

    const onPrint = useCallback(() => {
        window.print();
    }, []);

    const onSelect = useCallback((unit: string, unitAction) => {
        dispatch(unitAction(unit))
    }, [])

    const handleToggle = useCallback((toggle, open) => {
        toggle(!open)
    }, [])

    const getVaporPressure = useCallback(() => {
        if (!PACParams.chemical?.vapourPressure) {
            return
        }
        let vp = parseFloat(PACParams.chemical.vapourPressure)
        if (isNaN(vp)) {
            return PACParams.chemical.vapourPressure
        }
        return (vp*0.1).toString() + ' kPa'
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
        dispatch(SET_PAC_TOXITY_RATING(''))
    }, [])

    const clearRating = useCallback(() => {
        dispatch(SET_PAC_SHOW_CUT_OFF(false))
        dispatch(SET_PAC_TOXITY_RATING(''))
    }, [])

    const fetchVaporPressure = useCallback((casNo, vaporPressure, temp, tempUnit) => {
        server
        .fetchVaporPressure(casNo, vaporPressure || '', temp, tempUnit)
        .then((res) => {
            let fetchedVP = res.data.split('"')[1]
            if (!fetchedVP) {
                fetchedVP = 'No record in the database'
            }
            setFetchedVaporPressure(fetchedVP)
        })
    }, [])

    const fetchLiquidDensity = useCallback((casNo, temp, tempUnit) => {
        server
        .fetchLiqiudDensity(casNo, temp, tempUnit)
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

    const calculateToxityRating = useCallback(() => {
        if(PACParams.chemical) {
            server
            .getPACToxityRating(PACParams.chemicalCasNo || '', PACParams.AQ || '', PACParams.typeOfRelease || '', 
                PACParams.operatingTemp || '', PACParams.operatingTempUnit || '', PACParams.openTank ? '0' : PACParams.pressure || '', 
                PACParams.openTank ? 'kPa' : PACParams.pressureUnit || '', PACParams.diameter || '', 
                PACParams.chemical?.molWt || PACParams.molecularWeight || '', PACParams.density || '', 
                PACParams.liquidHeight || '', PACParams.boilingPoint || '', PACParams.heatCapacity || '', 
                PACParams.HOV || '', PACParams.vaporPressure || '', 
                PACParams.vaporPressureUnit || '', PACParams.dikedArea || '', PACParams.totalAmount || '')
            .then((res) => {
                if (res.data.includes('Toxity Rating')) {
                    dispatch(SET_PAC_TOXITY_RATING(res.data))
                    dispatch(SET_PAC_SHOW_CUT_OFF(true))
                }
                if (res.data.includes('heat capacity')) {
                    console.log('need to enter hc')
                    dispatch(SET_PAC_SHOW_HC(true))
                }
                if (res.data.includes('heat of vaporization')) {
                    dispatch(SET_PAC_SHOW_HOV(true))
                }
                if (res.data.includes('boiling point')) {
                    dispatch(SET_PAC_SHOW_BP(true))
                }
                if (res.data.includes('molecular weight')) {
                    dispatch(SET_PAC_SHOW_MW(true))
                }
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
                <ul id='pac-ul'>
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
            </div>
            <div className='pac-chemical-selector'>
                <div>Select a chemical to start the evaluation</div>
                <InputGroup>
                <Input
                    type='select'
                    invalid={!PACParams.chemicalCasNo}
                    value={PACParams.chemicalCasNo}
                    onChange={e => {
                        changeChemicalCasNo(e.target.value)
                        if (PACParams.typeOfRelease === 'Liquid') {
                            fetchVaporPressure(e.target.value, PACParams.chemical?.vapourPressure, PACParams.operatingTemp, PACParams.operatingTempUnit)
                            fetchLiquidDensity(e.target.value, PACParams.operatingTemp, PACParams.operatingTempUnit)
                        }
                    }}
                >
                    <option key='' value={undefined}></option>  
                    {equation.reactants.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                    {equation.products.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                    {equation.diluents.map((c, i) => <option key={i} value={c.casNo}>{c.productName}</option>)}
                </Input>
                <div className="invalid-feedback">
                    Please select a chemical!
                </div>
                </InputGroup>
            </div>
            { PACParams.chemicalCasNo && (
                <div className="pac-questions">
                    <div>
                        <div className={'pac-cell'}>
                            <div>Airborne quantity (AQ) known?</div>
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
                                                    // Fetch liquid vaporization perssure from backend
                                                    fetchVaporPressure(PACParams.chemicalCasNo, PACParams.chemical?.vapourPressure, PACParams.operatingTemp, PACParams.operatingTempUnit)
                                                    fetchLiquidDensity(PACParams.chemicalCasNo, PACParams.operatingTemp, PACParams.operatingTempUnit)
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
                                                    Gas Temperature
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
                                                <div>Is the container exposed to atmosphere?</div>
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
                                                            Pressure:
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
                                                    Operating Temperature
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
                                                        Operating temperature and its unit cannot be empty!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className={'pac-cell'}>
                                                <div>Is all liquid released in greater than 15 mins?</div>
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
                                                    Diameter of hole the liquid is releasing through (unit: mm):
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
                                                    Is the liquid released into a diked area?
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
                                            {
                                                PACParams.showBP && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Boiling Point (unit: &deg;C):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={PACParams.boilingPoint}
                                                            onWheel={e => e.currentTarget.blur()}
                                                            onKeyDown={e => handleOnKeyDown(e)}
                                                            invalid={!PACParams.boilingPoint}
                                                            onChange={e => dispatch(SET_PAC_BOILING_POINT(e.target.value))}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Boiling point cannot be empty!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
                                            {
                                                PACParams.showHC && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Heat capacity (unit: J/kg/&deg;C):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={PACParams.heatCapacity}
                                                            onWheel={e => e.currentTarget.blur()}
                                                            onKeyDown={e => handleOnKeyDown(e)}
                                                            invalid={!PACParams.heatCapacity || parseFloat(PACParams.heatCapacity) <= 0}
                                                            onChange={e => dispatch(SET_PAC_HEAT_CAPACITY(e.target.value))}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat capacity must be a positive number!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
                                            {
                                                PACParams.showHOV && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Heat of vaporization (unit: J/kg):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={PACParams.HOV}
                                                            invalid={!PACParams.HOV}
                                                            onWheel={e => e.currentTarget.blur()}
                                                            onKeyDown={e => handleOnKeyDown(e)}
                                                            onChange={e => dispatch(SET_PAC_HOV(e.target.value))}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat of vapozation cannot be empty!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
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
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Vapor Pressure:
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
                                            <div className='pac-cell'>
                                                <div>Vapor pressure stored in the PAC database:</div>
                                                {fetchedVaporPressure}
                                                <div style={{"marginTop": "10px"}}>Vapor pressure extracted from SDS:</div>
                                                {
                                                    PACParams.chemical 
                                                    ? (PACParams.chemical.vapourPressure 
                                                        ? getVaporPressure()
                                                        : 'No data available')
                                                    : 'No data available'
                                                }
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Liquid density (unit: kg/m&#179;):
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
                                                    <div className='pac-cell'>
                                                        Relative density from SDS: {PACParams.chemical.relDensity || 'No data available'}
                                                    </div>
                                                )
                                            }
                                            {
                                                pacLiquidDensity && (
                                                    <div className='pac-cell'>
                                                        {pacLiquidDensity}
                                                        <div>
                                                        (Specific gravity is relative to air (density 1000 kg/&#13221;) for gases and to water (denisty 1kg/&#13221;) for liquids and solids)
                                                        </div>
                                                    </div>
                                                )
                                                
                                            }
                                            {
                                                chemLiquidDensity && (
                                                    <div className='pac-cell'>
                                                        {chemLiquidDensity}
                                                    </div>
                                                )
                                            }
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
                        <Button className="green-btn pac-btn" onClick={calculateToxityRating}>
                            Calculate PAC Toxity Rating
                        </Button>
                    </div>
                    <div>
                        {
                            PACParams.toxityRating && (
                                <>
                                    <div id="pac-rating">{PACParams.toxityRating.split('"')[1].split(';')[0]}</div>
                                    <div id="pac-values">Values used in the calculation:</div>
                                    {PACParams.toxityRating.split('"')[1].split(';').slice(1).map(text => {
                                        return <div>{text}</div>
                                    })}
                                </>
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
