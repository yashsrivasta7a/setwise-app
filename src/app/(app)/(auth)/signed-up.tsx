import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            Alert.alert("Sign Up Failed", err?.errors?.[0]?.message || err?.message || "An unknown error occurred")
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
                Alert.alert("Verification Error", "Verification status not complete.")
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            Alert.alert("Verification Failed", err?.errors?.[0]?.message || err?.message || "An unknown error occurred")
        }
    }

    if (pendingVerification) {
        return (
            <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Verify your email</Text>
                <TextInput
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setCode(code)}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 15,
                        borderRadius: 8,
                        marginBottom: 20,
                        fontSize: 16
                    }}
                />
                <TouchableOpacity
                    onPress={onVerifyPress}
                    style={{
                        backgroundColor: '#007AFF',
                        padding: 15,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Verify</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Sign up</Text>

            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={(email) => setEmailAddress(email)}
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
                    marginBottom: 20,
                    fontSize: 16
                }}
            />

            <TouchableOpacity
                onPress={onSignUpPress}
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
                <Text style={{ fontSize: 16 }}>Already have an account?</Text>
                <Link href="/signed-in">
                    <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '500' }}>Sign in</Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}