import axios from 'axios';

const HOST = process.env.REACT_APP_BACKEND_URL || '';
const server = new axios.Axios({
    url: HOST,
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

    return res.data;
};

api.getHazardMatrix = async(hNums) => {
    const promises = Object.keys(hNums).map(async name => {
        const res = await server.post('/graph', hNums[name]['hNumbers'], {
            headers: { 'Content-Type': 'text/plain' },
        })
        const data = res.data
        data['name'] = name
        return data
    });

    return await Promise.all(promises);
};

api.calculationBlock = async(operatingParams, reactants, products) => {
    const res = await server.post('/calculate', {
        operatingParams: operatingParams,
        reactants: reactants,
        products: products
    })

    return res.data;
};

api.getCameoTable = async(reactants, products, diluents) => {
    // strip irrelevant data to reduce amount sent to server
    const reactantsStripped = reactants.map(reactant => {
        return {
            productName: reactant.productName,
            casNo: reactant.casNo
        }
    });

    const productsStripped = products.map(product => {
        return {
            productName: product.productName,
            casNo: product.casNo
        }
    });

    const diluentsStripped = diluents.map(diluent => {
        return {
            productName: diluent.productName,
            casNo: diluent.casNo
        }
    });

    const response = await server.post('/cameo', {
        reactants: reactantsStripped,
        products: productsStripped,
        diluents: diluentsStripped,
    });

    return response.data;
}

export default api;