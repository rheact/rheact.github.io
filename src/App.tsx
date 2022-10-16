import PageContent from 'layout/PageContent';
import Root from 'layout/Root';
import Sidebar from 'layout/Sidebar';
import Toolbar from 'layout/Toolbar';
import { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import ToolIndex from './pages/';
import createStore from './store';

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
                        <main>
                            <ToolIndex />
                        </main>
                        <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
                            &copy; CISTAR, {new Date().getFullYear()}
                        </footer>
                    </PageContent>
                </Root>
            </Router>
        </Provider>
    );
};

export default App;
