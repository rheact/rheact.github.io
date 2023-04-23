import server from './server';
import { Equation, OperatingParams, RheactState } from 'model';

const api = {

    checkLiveness() {
        return server.get('/').then(res => res.status === 200);
    },

    parsePDF(f: File, operatingParams: OperatingParams) {
        const formData = new FormData();
        formData.append('file', f, f.name);

        return server
            .post('/pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    temperature: operatingParams.temperature || 'None',
                    unit: operatingParams.temperatureUnit || 'None',
                },
            })
            .then(res => {
                return JSON.parse(res.data) as Equation;
            });
    },

    estimateCp(cas_no: string, temperature: string, unit: string) {
        return server
            .post('/estimate_cp', undefined, {
                params: { cas_no, temperature, unit }
            })
            .then(res => res.data);
    },

    getHazardMatrix(hNums: any) {
        const promises = Object.keys(hNums).map(async (name) => {
            const res = await server.post('/graph', null, {
                headers: { 'Content-Type': 'text/plain'},
                params: {
                    hnums: hNums[name].hNumbers,
                },
            });
            const data = JSON.parse(res.data);
            data.name = name;
            return data;
        });

        return Promise.all(promises);
    },

    getCalculationBlock(rstate: RheactState) {
        return server
            .post('/calculate', JSON.stringify(rstate))
            .then(res => {
                if(rstate.operatingParams.basis?.index == undefined) {
                    throw Error('No basis selected for the heat of reaction');
                }
                if(res.status === 422)
                    throw Error('Wrong data sent to server');
                if(res.status === 400)
                    throw Error('Error: ' + res.data);
                return res.data;
            });
    },

    getCameoTable(rstate: RheactState) {
        return server
            .post('/cameo', JSON.stringify(rstate))
            .then(res => {
                if(res.status === 400)
                    throw Error('Error: ' + res.data);
                return res.data
            });
    },

    getHeatOfFormation(casNo: string, phase: string, numberOfMoles: number) {
        return server
            .post('/heatOfFormation', undefined, {
                params: { casNo, phase, numberOfMoles: numberOfMoles.toString() }
            })
            .then(res => {
                if(res.status === 422)
                    throw Error('Wrong data sent to server');
                if(res.status === 400)
                    throw Error(res.data);
                return res.data
            })
    },
    
    getPACToxityRating(casNo: string, AQ: string, typeOfRelease: string, temp: string, tempUnit: string, pressure: string, pressureUnit: string, diameter: string, molecularWeight: string, density: string, liquidHeight: string, boilingPoint: string, heatCapacity: string, HOV: string, vaporPressure: string, vaporPressureUnit: string, dikedArea: string, totalAmount: string) {
        return server
            .post('/pac', undefined, {
                params: {casNo, AQ, typeOfRelease, temp, tempUnit, pressure, pressureUnit, diameter, molecularWeight, density, liquidHeight, boilingPoint, heatCapacity, HOV, vaporPressure, vaporPressureUnit, dikedArea, totalAmount}
            })
    },

    fetchVaporPressure(casNo: string, vaporPressureSDS: string, liquidTemp: string, liquidTempUnit: string) {
        return server
            .post('/vaporPressure', undefined, {
                params: {casNo, vaporPressureSDS, liquidTemp, liquidTempUnit}
            })
    },

    fetchLiqiudDensity(casNo: string, liquidTemp: string, liquidTempUnit: string) {
        return server
            .post('/liquidDensity', undefined, {
                params: {casNo, liquidTemp, liquidTempUnit}
            })
    },

    getMOCHMatrix(hNumsMap: {[key: string]: string}) {
        return server
            .post('/mocHmatrix', undefined, {
                params: {
                    hNumsMap: JSON.stringify(hNumsMap)
                }
            })
    }
};

export default api;
