export const ssoConfig = {
  okta: {
    enabled: true,
    issuer: process.env.OKTA_ISSUER,
    clientId: process.env.OKTA_CLIENT_ID
  },
  azure: {
    enabled: true,
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID
  },
  googleWorkspace: {
    enabled: true,
    clientId: process.env.GOOGLE_CLIENT_ID
  }
}
