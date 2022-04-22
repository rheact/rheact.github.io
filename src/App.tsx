import { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import ToolIndex from './pages/';
import Sidebar from 'layout/Sidebar';
import store from './store';
import PageContent from 'layout/PageContent';
import Root from 'layout/Root';
import Toolbar from 'layout/Toolbar';

const App: FC<any> = () => {
    return (
        <Root>
            <Sidebar />
            <PageContent>
                <Toolbar />
                <main>
                    <ToolIndex />
                </main>
                <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
                    &copy; CISTAR, 2021
                </footer>
            </PageContent>
        </Root>
    );
};

const AppWrapped: FC<any> = () => (
    <Provider store={store}>
        <Router >
            <App />
        </Router>
    </Provider>
);

export default AppWrapped;
