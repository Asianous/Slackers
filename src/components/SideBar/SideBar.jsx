import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Messages from '../Messages/Messages';
import Contacts from '../Contacts/Contacts';

const MESSAGES_KEY = 'messages';
const CONTACTS_KEY = 'contacts';

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
      </Tabs>
      {activeTab === MESSAGES_KEY && <Messages />}
      {activeTab === CONTACTS_KEY && <Contacts />}
    </div>
  );
}
