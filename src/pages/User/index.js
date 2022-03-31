import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import NotFound from "../NotFound";
import Feed from "../../components/Feed";
import Head from "../../components/Helper/Head";
import UserHeader from "../../components/User/UserHeader";
import UserPhotoPost from "../../components/User/UserPhotoPost";
import UserStats from "../../components/User/UserStats";

const User = () => {
  const { data } = useSelector((state) => state.user);

  return (
    <section className="container">
      <Head title={data.nome} />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
