import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/adminStyles/AdminList.module.css';
import { AdminTab } from './AdminTab';
import dashboardActive from '../../public/adminImg/menu/dashboard-active.svg';
import dashboard from '../../public/adminImg/menu/dashboard.svg';
import tasksActive from '../../public/adminImg/menu/tasks-active.svg';
import tasks from '../../public/adminImg/menu/tasks.svg';
import dealsActive from '../../public/adminImg/menu/deals-active.svg';
import deals from '../../public/adminImg/menu/deals.svg';
import usersActive from '../../public/adminImg/menu/contacts-active.svg';
import users from '../../public/adminImg/menu/contacts.svg';
import subtractActive from '../../public/adminImg/menu/Subtract-active.svg';
import subtract from '../../public/adminImg/menu/Subtract.svg';
import { useFetchService } from '../../utils/useFetchService';
import FieldsMethods from '../../api/FieldsMethods';
import Loader from '../Loader';

const icons = {
  users,
  usersActive,
  tabs: deals,
  tabsActive: dealsActive,
} as const;

export const AdminList = React.memo(() => {
  const router = useRouter();
  const { data: crud, loading } = useFetchService(FieldsMethods.getData);

  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = useCallback(() => setToggle((prevState) => !prevState), []);

  const onClick = useCallback((type: string) => async () => {
    await router.push(type);
  }, [router]);

  return (
    <div className={!toggle ? styles.adminCardsLeft : styles.adminCardsLeftToggleOn}>
      <div className={styles.adminCardsLeft_input}>
        <AdminTab
          short={toggle}
          srcActive={dashboardActive}
          srcNoActive={dashboard}
          text={'Главная'}
          onClick={onClick('/admin')}
          isActive={router.asPath === '/admin'}
        />
        <AdminTab
          short={toggle}
          srcActive={tasksActive}
          srcNoActive={tasks}
          text={'Документы'}
          onClick={onClick('/admin/docs')}
          isActive={router.asPath === '/admin/docs'}
        />
        {crud && Object.values(crud).map((field) => (
          <AdminTab
            key={field.name}
            short={toggle}
            srcActive={icons[`${field.icon}Active` as keyof typeof icons]}
            srcNoActive={icons[field.icon as keyof typeof icons]}
            text={field.title}
            onClick={onClick(`/admin/${field.name}`)}
            isActive={router.asPath === `/admin/${field.name}`}
          />
        ))}
        <div className="flex centered">
          {loading && (
            <Loader isVisible />
          )}
        </div>

        <AdminTab
          short={toggle}
          srcActive={subtractActive}
          srcNoActive={subtract}
          text={'Toggle sidebar'}
          onClick={toggleHandler}
          isActive={toggle}
        />
      </div>
    </div>
  );
});

AdminList.displayName = 'AdminList';
