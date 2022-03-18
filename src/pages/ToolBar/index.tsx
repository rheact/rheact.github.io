import { FC } from 'react';
import Tabs from './Tabs';
import SaveLoadGroup from './SaveLoad';

const ToolBar: FC<any> = function () {
    return (
        <div
            className="d-flex sticky-top mb-2 px-2"
            style={{ backgroundColor: 'white' }}
        >
            <Tabs />
            <div className="d-flex align-items-center ms-auto">
                <SaveLoadGroup />
            </div>
        </div>
    );
};

export default ToolBar;
