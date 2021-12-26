import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import ToolPage from './pages/Tool';
import store from './store';
import './dropzone.css';

const App = function RheactToolApp() {
    return (
        <Provider store={store}>
            <Navbar />
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
