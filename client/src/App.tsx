import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { client } from './graphql/client';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SplashScreen } from './components/Splash/SplashScreen';

const AppContent: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
};

function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );
}

export default App;
