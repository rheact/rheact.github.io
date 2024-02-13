import { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import PageContent from 'layout/PageContent';
import Root from 'layout/Root';
import Sidebar from 'layout/Sidebar';
import Toolbar from 'layout/Toolbar';
import ToolIndex from './pages/';
import createStore from './store';

import "./style.css"

type DisclaimerModalProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DisclaimerModal : FC<DisclaimerModalProps> = ({ open, setOpen }) => {
    return (
        <Modal isOpen={open} id='disclaimer-modal'>
            <ModalHeader>DISCLAIMER</ModalHeader>
            <ModalBody>
                <div id='disclaimer'>
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE CONTRIBUTORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS WITH THE SOFTWARE.
                </div>
                <Button id='disclaimer-btn' onClick={() => setOpen(false)}>Agree</Button>
            </ModalBody>
        </Modal>
    );
}

const App: FC<any> = () => {
    const [store, setStore] = useState(createStore())
    const [showDisclaimer, setShowDisclaimer] = useState(true);

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
                                <DisclaimerModal open={showDisclaimer} setOpen={setShowDisclaimer} />
                                <ToolIndex loadFn={setStore} showDisclaimer={showDisclaimer} />
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
