import React from "react";
import useFetch from "../../../hooks/useFetch";
import { STATS_GET } from "../../../api/api";

import Head from "../../Helper/Head";
import Loading from "../../Helper/Loading";
import Error from "../../Helper/Error";

const UserStatsGraphs = React.lazy(() => import("../UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      await request(url, options);
    }

    getData();
  }, [request]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error={error} />;
  } else if (data) {
    return (
      <React.Suspense fallback={null}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else {
    return null;
  }
};

export default UserStats;
