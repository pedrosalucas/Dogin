import React from "react";

import Feed from "../../components/Feed";
import Head from "../../components/Helper/Head";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Fotos" description="Home do site Dogin." />
      <Feed />
    </section>
  );
};

export default Home;

