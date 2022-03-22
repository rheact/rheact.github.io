import { Provider } from 'react-redux';
import ToolIndex from './pages/';
import store from './store';
import './css/dropzone.css';
import './css/printview.css';

const App = function RheactToolApp() {
    return (
        <Provider store={store}>
            <main>
                <ToolIndex />
            </main>
            <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
                &copy; CISTAR, 2021
            </footer>
        </Provider>
    );
};

export default App;
