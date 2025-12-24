import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

export default function index() {
  return (
    <SafeAreaView>
      <Headers />
      <Content />
    </SafeAreaView>
  )
}

function Content() {
  return (
    <Text>Content</Text>
  )
}

function Headers() {
  return (
    <SafeAreaView>
      <Link
        href="https://www.papareact.com/course"
      >
        Join My Course ❤️
      </Link>

    </SafeAreaView>
  );
}

