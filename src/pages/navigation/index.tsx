import { FC } from 'react';
import Tabs from './Tabs';
import OpButtons from './OpButtons';

const ToolBar: FC<any> = function () {
    return (
        <div
            className="d-flex sticky-top mb-2 px-2"
            style={{ backgroundColor: 'white' }}
        >
            <Tabs />
            <div className="d-flex align-items-center ms-auto">
                <OpButtons />
            </div>
        </div>
    );
};

export default ToolBar;
