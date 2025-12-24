import React from 'react'
import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import Loader from '@/src/hooks/loader';

const Layout = () => {
    const { isSignedIn, isLoaded, userId, getToken, sessionId } = useAuth();
    if (!isLoaded) {
        return (
            <Loader />
        );
    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!isSignedIn} >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!isSignedIn}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    )
}

export default Layout;