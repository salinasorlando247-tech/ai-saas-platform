import BuyCreditsModal from "./BuyCreditsModal.jsx"
import PostCreator from "./PostCreator.jsx"
import Scheduler from "./Scheduler.jsx"
import BrandSwitcher from "./BrandSwitcher.jsx"
import Analytics from "./Analytics.jsx"

export default function Dashboard(){
  return (
    <div style={{ display:"grid", gap:"2rem" }}>
      <BrandSwitcher/>
      <PostCreator/>
      <Scheduler/>
      <Analytics/>
      <BuyCreditsModal/>
    </div>
  )
}
