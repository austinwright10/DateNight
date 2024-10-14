import { useEffect } from 'react'
import Purchases from 'react-native-purchases'
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui'

export default function Paywall() {
  useEffect(() => {
    fetchProducts()
  })
  // async function presentPaywall(): Promise<boolean> {
  //   const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall()

  //   switch (paywallResult) {
  //     case PAYWALL_RESULT.NOT_PRESENTED:
  //     case PAYWALL_RESULT.ERROR:
  //     case PAYWALL_RESULT.CANCELLED:
  //       return false
  //     case PAYWALL_RESULT.PURCHASED:
  //     case PAYWALL_RESULT.RESTORED:
  //       return true
  //     default:
  //       return false
  //   }
  // }

  // async function presentPaywallIfNeeded() {
  //   const paywallResult: PAYWALL_RESULT =
  //     await RevenueCatUI.presentPaywallIfNeeded({
  //       requiredEntitlementIdentifier: 'monthly',
  //     })
  // }
  const fetchProducts = async () => {
    const products = await Purchases.getProducts(['dn_599_m']) // Replace with your product IDs
    console.log('products ', products)
    // Update your UI with the fetched products
  }

  const purchaseProduct = async (productId: any) => {
    try {
      const purchaseInfo = await Purchases.purchaseProduct(productId)
      // Handle successful purchase (e.g., update UI, unlock features)
    } catch (e) {
      // Handle purchase error (e.g., show error message)
      console.error(e)
    }
  }
  return <RevenueCatUI.Paywall />
}
