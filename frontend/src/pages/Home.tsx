// Página principal

import CopyForm from "../components/CopyForm";
import Header from "../components/Header";
import ResultDisplay from "../components/ResultDisplay";

function Home() {
  return (
    <div>
      <Header />

      <CopyForm />
      <ResultDisplay />
    </div>
  );
}

export default Home;
