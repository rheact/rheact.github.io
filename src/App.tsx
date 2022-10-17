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
                                <ToolIndex />
                            </main>
                            <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
                            Reactive Hazard Evaluation Analysis and Compilation Tool (RHEACT) v2.0 (Beta version), Oct 15, 2022
                                {/* &copy; CISTAR, {new Date().getFullYear()} */}
                            </footer>
                        </div>
                    </PageContent>
                </Root>
            </Router>
        </Provider>
    );
};

export default App;
