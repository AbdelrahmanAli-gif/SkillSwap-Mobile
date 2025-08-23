import React, { useEffect } from "react"
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { useColorScheme as useNativewindColorScheme } from "nativewind"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import RootNavigation from "./navigation/RootNavigation"
import Toast from "react-native-toast-message"
import "./global.css"
import "./i18n"
import * as Linking from "expo-linking"
import { Alert } from "react-native"

let pendingDeepLink = null

/** navigation ref so we can navigate from outside components */
export const navigationRef = createNavigationContainerRef()

/** helper: verify session on backend */
async function verifySessionWithServer(backendBase, sessionId) {
  const res = await fetch(
    `${backendBase}/api/verify-session?session_id=${encodeURIComponent(sessionId)}`
  )
  if (!res.ok) {
    const body = await res.text()
    throw new Error("Verify session failed: " + body)
  }
  return res.json()
}
import 'react-native-get-random-values';

function AppContent() {
  const { theme } = useTheme()
  const { setColorScheme } = useNativewindColorScheme()

  useEffect(() => {
    setColorScheme(theme)
  }, [theme])

  // handle incoming deep links (cold start + while running)
  useEffect(() => {
    // cold start
    ;(async function handleInitial() {
      try {
        const initialUrl = await Linking.getInitialURL()
        if (initialUrl) {
          console.log("[DeepLink] initial URL:", initialUrl)
          await handleUrl(initialUrl)
        }
      } catch (err) {
        console.error("Initial URL handler error:", err)
      }
    })()

    // runtime links
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("[DeepLink] event.url:", event.url)
      handleUrl(event.url).catch((e) => console.error("handleUrl error:", e))
    })

    return () => {
      subscription.remove()
    }
  }, []) // run once

  // if nav wasn't ready when link arrived, poll until ready and handle queued link
  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingDeepLink && navigationRef.isReady()) {
        console.log("[DeepLink] processing queued deep link", pendingDeepLink)
        handleUrl(`skillswap://payment-success?session_id=${pendingDeepLink.sessionId}`).catch(
          (e) => console.error(e)
        )
        pendingDeepLink = null
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // deep link handler
  async function handleUrl(url) {
    try {
      if (!url) return
      console.log("[DeepLink] Received URL ->", url)

      const parsed = Linking.parse(url) // { scheme, path, queryParams }
      const path = (parsed.path || "").replace(/^\/+/, "").toLowerCase()
      console.log("[DeepLink] parsed", parsed, "normalized path:", path)

      if (path !== "payment-success") {
        console.log("[DeepLink] Not a payment-success path, ignoring.")
        return
      }

      const sessionId =
        parsed.queryParams?.session_id ||
        parsed.queryParams?.sessionId ||
        parsed.queryParams?.session

      if (!sessionId) {
        console.warn("[DeepLink] No session_id in deep link:", parsed)
        return
      }

      // if nav not ready, queue it
      if (!navigationRef.isReady()) {
        pendingDeepLink = { sessionId }
        console.log("[DeepLink] navigationRef not ready — queued deep link:", pendingDeepLink)
        return
      }

      // use emulator backend host
      const backendBase = "http://10.0.2.2:4242"
      console.log("[DeepLink] Verifying session with backend:", sessionId)
      const result = await verifySessionWithServer(backendBase, sessionId)
      console.log("[DeepLink] verify-session result:", result)

      if (result.payment_status === "paid") {
        Alert.alert(
          "Payment success",
          `Payment confirmed. Amount: ${(result.amount_total / 100).toFixed(2)} ${result.currency}`
        )
        if (navigationRef.isReady()) {
          navigationRef.navigate("PaymentSuccess", { session: result })
        }
      } else {
        Alert.alert("Payment not completed", `Status: ${result.payment_status || result.status}`)
      }
    } catch (err) {
      console.error("Error handling deep link / verifying session:", err)
      Alert.alert("Payment error", "Could not verify payment. Check the logs.")
    }
  }

  return (
    <>
      <StatusBar style={"dark"} />
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNavigation />
        </NavigationContainer>
      </AuthProvider>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toast />
    </ThemeProvider>
  )
}
