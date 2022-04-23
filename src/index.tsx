import ReactDOM from 'react-dom';
import App from './App';
import 'bootswatch/dist/sandstone/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/global.css';
import './css/printview.css';
import './css/dropzone.css';

window.onbeforeunload = () => {
    const msg = "Please save RHEACT file before going!";
    alert(msg);
    return msg;
};

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
