import axios from 'axios';
import _ from 'lodash';
import { Chemical, Compound, OperatingParams } from '../store';
import { standardizeOperatingParams } from '../units';

const HOST = process.env.REACT_APP_BACKEND_URL || '';
const server = new axios.Axios({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

// export value
const api = {

    async parsePDF(f: File, operatingParams: OperatingParams) {
        if (!operatingParams.temperature) {
            throw Error('Temperature value required!');
        }

        const formData = new FormData();
        formData.append('file', f, f.name);
        const standardParams = standardizeOperatingParams(operatingParams);

        const res = await server.post('/pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                temperature: standardParams.temperature as string,
            },
        });

        if (res.status === 400) {
            throw Error('Error 400, please inform CISTAR developers');
        }

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

    async getCalculationBlock(operatingParams: OperatingParams, compound: Compound) {
        const standardized = standardizeOperatingParams(operatingParams);
        const data = {
            operatingParams: standardized,
            reactants: compound.reactants,
            products: compound.products,
        };
        const res = await server.post('/calculate', JSON.stringify(data));
        return res.data;
    },

    async getCameoTable(compound: Compound) {
        // strip irrelevant data to reduce amount sent to server
        const mapPick = (lst: Chemical[]) => _(lst).map((x) => _.pick(x, ['productName', 'casNo']));
        const data = {
            reactants: mapPick(compound.reactants),
            products: mapPick(compound.products),
            diluents: mapPick(compound.diluents),
        };
        const res = await server.post('/cameo', JSON.stringify(data));
        return res.data;
    },
};

export default api;
