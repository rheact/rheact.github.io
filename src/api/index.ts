import server from './server';
import { Compound, OperatingParams, RheactState } from '../store';

const api = {

    async parsePDF(f: File, operatingParams: OperatingParams) {
        if (!operatingParams.temperature) {
            throw Error('Temperature value required!');
        }

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

        return JSON.parse(res.data) as Compound;
    },

    async getHazardMatrix(hNums: any) {
        const promises = Object.keys(hNums).map(async (name) => {
            const res = await server.post('/graph', hNums[name].hNumbers, {
                headers: { 'Content-Type': 'text/plain' },
            });
            const data = JSON.parse(res.data);
            data.name = name;
            return data;
        });

        return Promise.all(promises);
    },

    async getCalculationBlock(rstate: RheactState) {
        const res = await server.post('/calculate', JSON.stringify(rstate));
        return res.data;
    },

    async getCameoTable(rstate: RheactState) {
        const res = await server.post('/cameo', JSON.stringify(rstate));
        return res.data;
    },
};

export default api;
