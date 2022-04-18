import * as STORE from 'store';
import BaseCard, { EquationDropzoneProps } from './BaseCard';

export const ReactantDropzone = () => {
    const props: EquationDropzoneProps = {
        label: 'Reactants',
        name: 'reactants',
        bg: "warning",
        addAction: STORE.ADD_REACTANT,
        changeAction: STORE.CHANGE_REACTANT,
        removeAction: STORE.REMOVE_REACTANT,
    };

    return <BaseCard {...props} />;
};

export const ProductDropzone = () => {
    const props: EquationDropzoneProps = {
        label: 'Products',
        name: 'products',
        bg: "success",
        addAction: STORE.ADD_PRODUCT,
        changeAction: STORE.CHANGE_PRODUCT,
        removeAction: STORE.REMOVE_PRODUCT,
    };

    return <BaseCard {...props} />;
};

export const DiluentDropzone = () => {
    const props: EquationDropzoneProps = {
        label: "Diluents",
        name: "diluents",
        bg: "primary",
        addAction: STORE.ADD_DILUENT,
        changeAction: STORE.CHANGE_DILUENT,
        removeAction: STORE.REMOVE_DILUENT,
    };

    return <BaseCard {...props} />;
};
