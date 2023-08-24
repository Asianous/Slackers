import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Messages from '../Messages/Messages';
import Contacts from '../Contacts/Contacts';
import UserSearch from '../UserSearch/Search';

const MESSAGES_KEY = 'messages';
const CONTACTS_KEY = 'contacts';
const USER_SEARCH_KEY = 'userSearch';

export default function SideBar({ user }) {
  const [activeTab, setActiveTab] = useState(MESSAGES_KEY);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Messages" value={MESSAGES_KEY} />
        <Tab label="Contacts" value={CONTACTS_KEY} />
        <Tab label="User Search" value={USER_SEARCH_KEY} />
      </Tabs>
      {activeTab === MESSAGES_KEY && <Messages />}
      {activeTab === CONTACTS_KEY && <Contacts />}
      {activeTab === USER_SEARCH_KEY && <UserSearch />}
    </div>
  );
}
