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
    </>
  );
}

export default App;
