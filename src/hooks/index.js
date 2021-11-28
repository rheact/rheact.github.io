import { useCallback, useState } from 'react';

export const useInput = (initValue = '') => {
    const [state, setState] = useState(initValue);

    const onChange = useCallback(e => setState(e.target.value), []);

    return {
        onChange,
        value: state,
    };
};