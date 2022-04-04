import server from './server';
import { Equation, OperatingParams, RheactState } from 'store';

const api = {

    async parsePDF(f: File, operatingParams: OperatingParams) {
        const formData = new FormData();
        formData.append('file', f, f.name);

        const res = await server.post('/pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                temperature: operatingParams.temperature,
            },
        });

        return JSON.parse(res.data) as Equation;
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
            .then(res => res.data);
    },

    getCameoTable(rstate: RheactState) {
        return server
            .post('/cameo', JSON.stringify(rstate))
            .then(res => res.data);
    },
};

export default api;
