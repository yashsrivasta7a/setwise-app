import Loader from "@/components/loader";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { isSignedIn, isLoaded, userId, getToken, sessionId } = useAuth();
  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
