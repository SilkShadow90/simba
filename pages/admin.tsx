import type { NextPage } from 'next';
import React from 'react';
import { MainPage } from '../components/adminPanel/adminPage/MainPage';
import { AdminPage } from '../components/adminPanel/adminPage/AdminPage';

const Admin: NextPage = () => {
  return (
    <AdminPage>
      <MainPage/>
    </AdminPage>
  );
};

export default Admin;
