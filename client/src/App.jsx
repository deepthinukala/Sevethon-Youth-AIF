import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import SevathonBoothTab from './components/SevathonBoothTab';
import SkillingTab from './components/SkillingTab';
import HubsTab from './components/HubsTab';
import ContactTab from './components/ContactTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('sevathon'); // Default to Sevathon Booth tab as requested by user

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--sand-bg)' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === 'sevathon' && <SevathonBoothTab />}
        {activeTab === 'skilling' && <SkillingTab setActiveTab={setActiveTab} />}
        {activeTab === 'hubs' && <HubsTab setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <ContactTab />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
