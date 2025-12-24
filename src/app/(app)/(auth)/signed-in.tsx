import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
                Alert.alert("Error", "Sign in status not complete. See console for details.")
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            Alert.alert("Sign In Failed", err?.errors?.[0]?.message || err?.message || "An unknown error occurred")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Sign in</Text>

                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 15,
                        borderRadius: 8,
                        marginBottom: 15,
                        fontSize: 16
                    }}
                />
                <TextInput
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 15,
                        borderRadius: 8,
                        marginBottom: 15,
                        fontSize: 16
                    }}
                />

                <TouchableOpacity
                    onPress={onSignInPress}
                    style={{
                        backgroundColor: '#007AFF',
                        padding: 15,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Continue</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
                    <Link href="/signed-up">
                        <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '500' }}>Sign up</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}