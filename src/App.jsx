import Navbar from './components/Navbar';
import ToolPage from './pages/Tool';
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="p-2">
        <ToolPage />
      </main>
      <footer className="py-5 d-flex justify-content-center align-items-center text-muted">
        &copy; CISTAR, 2021
      </footer>
    </>
  );
}

export default App;
