import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        headerShown: false, title: "Home", tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="history" options={{
        headerShown: false, title: "History", tabBarIcon: ({ color, size }) => (
          <AntDesign name="history" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="workout" options={{
        headerShown: false, title: "Workout", tabBarIcon: ({ color, size }) => (
          <AntDesign name="plus-circle" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="exercises" options={{
        headerShown: false, title: "Exercises", tabBarIcon: ({ color, size }) => (
          <AntDesign name="book" size={size} color={color} />
        )
      }} />

      <Tabs.Screen name="profile" options={{
        headerShown: false, title: "Profile", tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )
      }} />
    </Tabs>
  )
}

export default _layout