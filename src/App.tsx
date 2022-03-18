import { Provider } from 'react-redux';
import ToolPage from './pages';
import store from './pages/store';
import './dropzone.css';

const App = function RheactToolApp() {
    return (
        <Provider store={store}>
            <main>
                <ToolPage />
            </main>
            <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
                &copy; CISTAR, 2021
            </footer>
        </Provider>
    );
};

export default App;
