import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Transactions from "./transactions/Transactions";

function Home() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Transactions/>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
