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
                headers: { 'Content-Type': 'text/plain' },
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
    }
};

export default api;
