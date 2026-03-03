import type { CommerceClientConfig } from '@logiteria/commerce-sdk'

/** Serializable config — safe to pass from Server Components to Client Components */
export const commerceConfig: CommerceClientConfig = {
  storeUrl: process.env.NEXT_PUBLIC_STORE_URL || 'https://demo.lumocomm.com',
}
