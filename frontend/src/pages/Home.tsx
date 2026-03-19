// Página principal

import { useState } from "react";
import CopyForm from "../components/CopyForm";
import Header from "../components/Header";
import ResultDisplay from "../components/ResultDisplay";

function Home() {
  const [view, setView] = useState<"send" | "receive">("send");

  const onSetView = (view: "send" | "receive") => {
    setView(view);
  };
  return (
    <div className="home-container">
      <Header setView={onSetView} />
      {view === "send" ? <CopyForm /> : <ResultDisplay />}
    </div>
  );
}

export default Home;
