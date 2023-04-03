import React, { PropsWithChildren } from 'react';
import styles from '../../../styles/adminStyles/Admin.module.css';
import { AdminList } from '../AdminList';
import { AuthModal } from '../../AuthModal';
import { Page } from '../../Page';
import { Flex } from '../../UIKit/Flex';

export const AdminPage = React.memo(({ children }: PropsWithChildren) => {
  return (
    <Page title="Панель Администратора" withoutHeaderAndFooter>
      <Flex flexDirection="row" styleProps={styles.adminPage} padding="0">
        <Flex flex="0 0 auto" flexDirection="column" padding="0">
          <AdminList />
        </Flex>
        <Flex flexDirection="column">
          {children}
        </Flex>
      </Flex>
      <AuthModal />
    </Page>
  );
});

AdminPage.displayName = 'AdminPage';
