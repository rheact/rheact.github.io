import { isUndefined } from 'lodash';
import { useToggle } from "react-use";
import { useSelector } from "react-redux";
import { FC, useState, useCallback } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, Input, Label, Container, Button, Tooltip } from "reactstrap";
import { Chemical, Equation, RheactState } from "model";
import { PRESSURE_UNITS_LIST, PAC_PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from 'units'
import server from "api";

import './style.css'

const PACPage = () => {
    const equation = useSelector<RheactState, Equation>(state => state.compound);
    const [chemicalCasNo, setChemicalCasNo] = useState<string>('')
    const [chemical, setChemical] = useState<Chemical>()
    const [AQ, setAQ] = useState<string>('')
    const [AQKnown, setAQKnown] = useState<boolean>()
    const [typeOfRelease, setTypeOfRelease] = useState<string>('')
    const [diameter, setDiameter] = useState<string>('')
    const [toxityRating, setToxityRating] = useState<string>('') 
    const [pressure, setPressure] = useState<string>('')
    const [pressureUnit, setPressureUnit] = useState<string>('')
    const [operatingTemp, setOperatingTemp] = useState<string>('')
    const [tempUnit, setTempUnit] = useState<string>('')
    const [liquidHeight, setLiquidHeight] = useState<string>('')
    const [density, setDensity] = useState<string>('')
    const [vaporPressure, setVaporPressure] = useState<string>('')
    const [vaporPressureUnit, setVaporPressureUnit] = useState<string>('')
    const [HOV, setHOV] = useState<string>('')
    const [heatCapacity, setHeatCapacity] = useState<string>('')
    const [boilingPoint, setBoilingPoint] = useState<string>('')
    const [molecularWeight, setMolecularWeihgt] = useState<string>('')
    const [dikedArea, setDikedArea] = useState<string>('')
    const [isDikedArea, setIsDikedArea] = useState<boolean>()
    const [useTotalAmount, setUseTotalAmount] = useState<boolean>()
    const [totalAmount, setTotalAmount] = useState<string>('')
    const [openTank, setOpenTank] = useState<boolean>()
    const [showHOV, setShowHOV] = useState<boolean>(false)
    const [showHC, setShowHC] = useState<boolean>(false)
    const [showBP, setShowBP] = useState<boolean>(false)
    const [showMW, setShowMW] = useState<boolean>(false)
    const [showCutOff, setShowCutOff] = useState<boolean>(false);
    const [fetchedVaporPressure, setFetchedVaporPressure] = useState<string>('')
    const [liquidDensitySource, setLiquidDensitySource] = useState<string>('')
    const [openTooltip, toggleTooltip] = useToggle(false);
    const [openPressure, togglePressure] = useToggle(false)
    const [openVPressure, toggleVPressure] = useToggle(false)
    const [openTemp, toggleTemp] = useToggle(false)

    const onSelect = useCallback((unit: string, unitAction) => {
        unitAction(unit)
    }, [])

    const handleToggle = useCallback((toggle, open) => {
        toggle(!open)
    }, [])

    const clearAllValues = useCallback(() => {
        setChemical(undefined)
        setAQKnown(undefined)
        setChemicalCasNo('')
        setAQ('')
        setTypeOfRelease('')
        setToxityRating('')
        setShowCutOff(false);
        clearValues()
    }, [])

    const clearValues = useCallback(() => {
        setOpenTank(undefined)
        setPressure('')
        setPressureUnit('')
        setOperatingTemp('')
        setTempUnit('')
        setUseTotalAmount(undefined)
        setTotalAmount('')
        setDiameter('')
        setLiquidHeight('')
        setIsDikedArea(undefined)
        setDikedArea('')
        setVaporPressure('')
        setVaporPressureUnit('')
        setHeatCapacity('')
        setHOV('')
        setBoilingPoint('')
        setMolecularWeihgt('')
    }, [])

    const clearRating = useCallback(() => {
        setToxityRating('')
        setShowCutOff(false);
    }, [])

    const clearRadioSelectionTypeOfRelease = useCallback(() => {
        setTypeOfRelease('')
        clearRadioSelection()
    }, [])

    const clearRadioSelection = useCallback(() => {
        setOpenTank(undefined)
        setUseTotalAmount(undefined)
        setIsDikedArea(undefined)
    }, [])

    const fetchVaporPressure = useCallback((casNo, vaporPressure, temp, tempUnit) => {
        server
        .fetchVaporPressure(casNo, vaporPressure || '', temp, tempUnit)
        .then((res) => {
            setFetchedVaporPressure(res.data.split('"')[1])
        })
    }, [])

    const fetchLiquidDensity = useCallback((casNo, temp, tempUnit) => {
        server
        .fetchLiqiudDensity(casNo, temp, tempUnit)
        .then((res) => {
            let strs = res.data.split(',')
            let d = strs[0].split('"')
            let s = strs[1].split('"')
            setDensity(d[1])
            setLiquidDensitySource(s[1])
        })
    }, [])

    const calculateToxityRating = useCallback(() => {
        
        if(chemical) {
            server
            .getPACToxityRating(chemicalCasNo || '', AQ, typeOfRelease, operatingTemp, tempUnit, openTank ? '0' : pressure, openTank ? 'kPa' : pressureUnit, diameter, chemical.molWt || molecularWeight, density, liquidHeight, boilingPoint, heatCapacity, HOV, vaporPressure, vaporPressureUnit, dikedArea, totalAmount)
            .then((res) => {
                setToxityRating(res.data)
                const regex = new RegExp('[0-9]\.[0-9]');
                if (regex.test(res.data)) {
                    setShowCutOff(true);
                }
                if (res.data.includes('heat capacity')) {
                    setShowHC(true)
                }
                if (res.data.includes('heat of vaporization')) {
                    setShowHOV(true)
                }
                if (res.data.includes('boiling point')) {
                    setShowBP(true)
                }
                if (res.data.includes('molecular weight')) {
                    setShowMW(true);
                }
            })
        }
    }, [AQ, typeOfRelease, chemicalCasNo, operatingTemp, tempUnit, pressure, pressureUnit, diameter, density, liquidHeight, boilingPoint, heatCapacity, HOV, vaporPressure, vaporPressureUnit, molecularWeight, dikedArea, totalAmount, openTank])

    const changeChemicalCasNo = useCallback((newCasNo) => {
        setChemicalCasNo(newCasNo)
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
            setChemical(chem[0])
            
            if(!chem[0].relDensity || chem[0].relDensity == 'No data available') {
                setDensity('')
            } else {
                let density = parseFloat(chem[0].relDensity) * 997
                setDensity(density.toString())
            }
            setShowHC(false)
            setShowHOV(false)
            setShowBP(false)
            setShowMW(false)
            clearValues()
            clearRating()
        }
    }, [equation])

    return (
        <Container className="pac-page">
            <div className='title-wrapper'>
                <h1>Protective Action Criteria (PAC) Toxicity Rating</h1>
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
                    invalid={!chemicalCasNo}
                    value={chemicalCasNo}
                    onChange={e => {
                        changeChemicalCasNo(e.target.value)
                        console.log('change cas no to ', e.target.value)
                        clearValues()
                        if (typeOfRelease === 'Liquid') {
                            console.log('refetch vapor pressure')
                            fetchVaporPressure(e.target.value, chemical?.vapourPressure, operatingTemp, tempUnit)
                            console.log('refetch liquid density')
                            fetchLiquidDensity(e.target.value, operatingTemp, tempUnit)
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
            { chemicalCasNo && (
                <div className="pac-questions">
                    <div>
                        <div className={'pac-cell'}>
                            <div>Airborne quantity (AQ) known?</div>
                            <div className="pac-answers">
                                <Input
                                    name="AQ"
                                    type="radio"
                                    onChange={(e) => {
                                        if(e.target.checked) {
                                            setAQKnown(true)
                                            clearRadioSelectionTypeOfRelease()
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
                                    onChange={(e) => {
                                        if(e.target.checked) {
                                            setAQKnown(false)
                                            setAQ('')
                                            clearRadioSelectionTypeOfRelease()
                                        }
                                    }}
                                />
                                {' '}
                                <Label check>
                                    No
                                </Label>
                            </div>
                        </div>
                        { AQKnown && (
                                <div className={'pac-cell'}>
                                    <Label>
                                        Airborne Quantity (unit: kg/s):
                                    </Label>
                                    <Input 
                                        type="number" 
                                        value={AQ}
                                        onChange={e => setAQ(e.target.value)}
                                    />
                                </div>
                        )
                        }
                        { !isUndefined(AQKnown) && !AQKnown && (
                            <>
                                <div className={'pac-cell'}>
                                    <div>Type of release:</div>
                                    <div className="pac-answers">
                                        <Input
                                            name="typeOfRelease"
                                            type="radio"
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    setTypeOfRelease('Gas')
                                                    clearRating()
                                                    clearRadioSelection()
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
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    setTypeOfRelease('Liquid')
                                                    // Fetch liquid vaporization perssure from backend
                                                    fetchVaporPressure(chemicalCasNo, chemical?.vapourPressure, operatingTemp, tempUnit)
                                                    fetchLiquidDensity(chemicalCasNo, operatingTemp, tempUnit)
                                                    clearRating()
                                                    clearRadioSelection()
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
                                    typeOfRelease == 'Gas' && (
                                        <>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Pressure:
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={pressure}
                                                        invalid={!pressure || !pressureUnit}
                                                        onChange={e => setPressure(e.target.value)}
                                                    />
                                                    <ButtonDropdown isOpen={openPressure} toggle={() => handleToggle(togglePressure, openPressure)}>
                                                        <DropdownToggle caret>
                                                            {pressureUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {PAC_PRESSURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, setPressureUnit)}>
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
                                                        value={diameter}
                                                        invalid={!diameter || parseFloat(diameter) <= 0}
                                                        onChange={e => setDiameter(e.target.value)}
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
                                                        value={operatingTemp}
                                                        invalid={!operatingTemp || !tempUnit}
                                                        onChange={e => setOperatingTemp(e.target.value)}
                                                    />
                                                    <ButtonDropdown isOpen={openTemp} toggle={() => {handleToggle(toggleTemp, openTemp)}}>
                                                        <DropdownToggle caret>
                                                            {tempUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {TEMPERATURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, setTempUnit)}>
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
                                                showMW && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Molecular Weight (unit: g/mol):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={molecularWeight}
                                                                invalid={!molecularWeight || parseFloat(molecularWeight) <= 0}
                                                                onChange={e => setMolecularWeihgt(e.target.value)}
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
                                    typeOfRelease == 'Liquid' && (
                                        <>
                                            <div className={'pac-cell'}>
                                                <div>Is the container exposed to atmosphere?</div>
                                                <div className="pac-answers">
                                                    <Input
                                                        name="openTank"
                                                        type="radio"
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setOpenTank(true)
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
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setOpenTank(false)
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
                                                !isUndefined(openTank) && !openTank && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Pressure:
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={pressure}
                                                                invalid={!pressure || !pressureUnit}
                                                                onChange={e => setPressure(e.target.value)}
                                                            />
                                                            <ButtonDropdown isOpen={openPressure} toggle={() => handleToggle(togglePressure, openPressure)}>
                                                                <DropdownToggle caret>
                                                                    {pressureUnit}
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    {PAC_PRESSURE_UNITS_LIST.map((u) => (
                                                                        <DropdownItem onClick={() => onSelect(u, setPressureUnit)}>
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
                                                        value={operatingTemp}
                                                        invalid={!operatingTemp || !tempUnit}
                                                        onChange={e => setOperatingTemp(e.target.value)}
                                                    />
                                                    <ButtonDropdown isOpen={openTemp} toggle={() => {handleToggle(toggleTemp, openTemp)}}>
                                                        <DropdownToggle caret>
                                                            {tempUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {TEMPERATURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, setTempUnit)}>
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
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setUseTotalAmount(false)
                                                                setTotalAmount('')
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
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setUseTotalAmount(true)
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
                                                useTotalAmount && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Total amount of liquid in the container (unit: kg):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={totalAmount}
                                                                invalid={!totalAmount || parseFloat(totalAmount) <= 0}
                                                                onChange={e => setTotalAmount(e.target.value)}
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
                                                        value={diameter}
                                                        invalid={!diameter || parseFloat(diameter) <= 0}
                                                        onChange={e => setDiameter(e.target.value)}
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
                                                        value={liquidHeight}
                                                        invalid={!liquidHeight || parseFloat(liquidHeight) <= 0}
                                                        onChange={e => setLiquidHeight(e.target.value)}
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
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setIsDikedArea(true)
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
                                                        onChange={(e) => {
                                                            if(e.target.checked) {
                                                                setIsDikedArea(false)
                                                                setDikedArea('')
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
                                                isDikedArea && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Diked Area (unit: m&#178;):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={dikedArea}
                                                                invalid={!dikedArea || parseFloat(dikedArea) <= 0}
                                                                onChange={e => setDikedArea(e.target.value)}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Diked area must be a positive number!
                                                            </div>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            }
                                            {
                                                showBP && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Boiling Point (unit: &deg;C):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={boilingPoint}
                                                            invalid={!boilingPoint}
                                                            onChange={e => setBoilingPoint(e.target.value)}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Boiling point cannot be empty!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
                                            {
                                                showHC && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Heat capacity (unit: J/kg/&deg;C):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={heatCapacity}
                                                            invalid={!heatCapacity || parseFloat(heatCapacity) <= 0}
                                                            onChange={e => setHeatCapacity(e.target.value)}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat capacity must be a positive number!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
                                            {
                                                showHOV && (
                                                <div className={'pac-cell'}>
                                                    <Label>
                                                        Heat of vaporization (unit: J/kg):
                                                    </Label>
                                                    <InputGroup>
                                                        <Input 
                                                            type="number"
                                                            value={HOV}
                                                            invalid={!HOV}
                                                            onChange={e => setHOV(e.target.value)}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Heat of vapozation cannot be empty!
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                )
                                            }
                                            {
                                                showMW && (
                                                    <div className={'pac-cell'}>
                                                        <Label>
                                                            Molecular Weight (unit: g/mol):
                                                        </Label>
                                                        <InputGroup>
                                                            <Input 
                                                                type="number"
                                                                value={molecularWeight}
                                                                invalid={!molecularWeight || parseFloat(molecularWeight) <= 0}
                                                                onChange={e => setMolecularWeihgt(e.target.value)}
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
                                                        value={vaporPressure}
                                                        invalid={!vaporPressure || !vaporPressureUnit}
                                                        onChange={e => setVaporPressure(e.target.value)}
                                                    />
                                                    <ButtonDropdown isOpen={openVPressure} toggle={() => handleToggle(toggleVPressure, openVPressure)}>
                                                        <DropdownToggle caret>
                                                            {vaporPressureUnit}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {PRESSURE_UNITS_LIST.map((u) => (
                                                                <DropdownItem onClick={() => onSelect(u, setVaporPressureUnit)}>
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
                                                    chemical ? (chemical.vapourPressure ? chemical.vapourPressure : 'No data available') : 'No data available'
                                                }
                                            </div>
                                            <div className={'pac-cell'}>
                                                <Label>
                                                    Liquid density (unit: kg/m&#179;):
                                                </Label>
                                                <InputGroup>
                                                    <Input 
                                                        type="number"
                                                        value={density}
                                                        invalid={!density || parseFloat(density) < 0}
                                                        onChange={e => setDensity(e.target.value)}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Liquid density must be a positive number!
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className='pac-cell'>
                                                {liquidDensitySource}
                                            </div>
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
                            toxityRating && (
                                <>
                                    <div id="pac-rating">{toxityRating.split('"')[1].split(';')[0]}</div>
                                    <div id="pac-values">Values used in the calculation:</div>
                                    {toxityRating.split('"')[1].split(';').slice(1).map(text => {
                                        return <div>{text}</div>
                                    })}
                                </>
                            )
                        }
                    </div>
                    {
                        showCutOff && (
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
    );
};

export default PACPage;
