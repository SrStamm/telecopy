// Página principal

import CopyForm from "../components/CopyForm";
import Header from "../components/Header";
import ResultDisplay from "../components/ResultDisplay";

function Home() {
  return (
    <div className="home-container">
      <Header />
      <CopyForm />
      <ResultDisplay />
    </div>
  );
}

export default Home;
