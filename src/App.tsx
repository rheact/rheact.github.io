import PageContent from 'layout/PageContent';
import Root from 'layout/Root';
import Sidebar from 'layout/Sidebar';
import Toolbar from 'layout/Toolbar';
import { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import ToolIndex from './pages/';
import createStore from './store';

import "./style.css"

const App: FC<any> = () => {
    const [store, setStore] = useState(createStore())

    return (
        <Provider store={store}>
            <Router >
                {/* Layout */}
                <Root>
                    <Sidebar loadFn={setStore}/>
                    <PageContent>
                        <Toolbar />
                        <div id="main-content-wrapper">
                            <main>
                                <ToolIndex loadFn={setStore}/>
                            </main>
                            <footer className='py-5'>
                                <div className="d-flex justify-content-center align-items-center text-muted">
                                    RHEACT is currently under development and we anticipate a stable Beta version by Spring 2024
                                </div>
                                <div className="d-flex justify-content-center align-items-center text-muted">
                                    Reactive Hazard Evaluation Analysis and Compilation Tool (RHEACT) v3.0 (Beta version), Dec 1, 2023
                                    {/* &copy; CISTAR, {new Date().getFullYear()} */}
                                </div>
                            </footer>
                        </div>
                    </PageContent>
                </Root>
            </Router>
        </Provider>
    );
};

export default App;
