import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import JobDetails from './components/phases/JobDetails';
import MarketIntelligence from './components/phases/MarketIntelligence';
import Pricing from './components/phases/Pricing';
import PerformancePreview from './components/phases/PerformancePreview';
import Checkout from './components/phases/Checkout';
import AdManager from './components/phases/AdManager';

function PhaseRouter() {
  const { state } = useApp();

  switch (state.activePhase) {
    case 1: return <JobDetails />;
    case 2: return <MarketIntelligence />;
    case 3: return <Pricing />;
    case 4: return <PerformancePreview />;
    case 5: return <Checkout />;
    case 6: return <AdManager />;
    default: return <JobDetails />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <PhaseRouter />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
