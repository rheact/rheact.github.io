import axios from 'axios';
import _ from 'lodash';

const HOST = process.env.REACT_APP_BACKEND_URL || '';
const server = new axios.Axios({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

// export value
const api = {};

/**
 * @argument f {File[]}
 */
api.parsePDF = async(f, temperature) => {
    const formData = new FormData();
    formData.append("file", f[0], f[0].name);

    const res = await server.post('/pdf', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: {
            temperature,
        },
    });

    if (res.status === 400) {
        throw Error("Error 400, please inform CISTAR developers");
    }

    return JSON.parse(res.data);
};

/**
 * @param {import('../pages/Tool/state').Compound} compound
 */
api.getHazardMatrix = async(hNums) => {
    const promises = Object.keys(hNums).map(async name => {
        const res = await server.post('/graph', hNums[name]['hNumbers'], {
            headers: { 'Content-Type': 'text/plain' },
        });
        const data = JSON.parse(res.data);
        data['name'] = name;
        return data;
    });

    return await Promise.all(promises);
};

api.getCalculationBlock = async(operatingParams, compound) => {
    const data = {
        operatingParams: operatingParams,
        reactants: compound.reactants,
        products: compound.products,
    };
    const res = await server.post('/calculate', JSON.stringify(data));
    return res.data;
};

api.getCameoTable = async(compound) => {
    // strip irrelevant data to reduce amount sent to server
    const mapPick = (lst) => _(lst).map(x => _.pick(x, ['productName', 'casNo']));
    const data = {
        reactants: mapPick(compound.reactants),
        products: mapPick(compound.products),
        diluents: mapPick(compound.diluents),
    };
    const res = await server.post('/cameo', JSON.stringify(data));
    return res.data;
}

export default api;