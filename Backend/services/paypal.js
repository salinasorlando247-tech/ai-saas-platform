import checkoutNodeJssdk from "@paypal/checkout-server-sdk"
const env = new checkoutNodeJssdk.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET)
const client = new checkoutNodeJssdk.core.PayPalHttpClient(env)

export async function createPaypalOrder(amount, credits){
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest()
  request.requestBody({
    intent:"CAPTURE",
    purchase_units:[{ amount:{ currency_code:"USD", value: amount } }]
  })
  const order = await client.execute(request)
  return order.result.links.find(l=>l.rel==="approve").href
}
