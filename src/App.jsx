import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="pt-16">
        <HomePage />
      </main>
    </>
  );
};

export default App;
