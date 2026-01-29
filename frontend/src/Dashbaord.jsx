import BuyCreditsModal from "./BuyCreditsModal"
import Calendar from "./Calendar"
import PostCreator from "./PostCreator"
import BrandSwitcher from "./BrandSwitcher"
import Analytics from "./Analytics"
import Scheduler from "./Scheduler"

export default function Dashboard(){
  return (
    <div style={{ padding:"2rem" }}>
      <h1>AI Social Automater Dashboard</h1>
      <BrandSwitcher/>
      <PostCreator/>
      <Scheduler/>
      <Calendar/>
      <Analytics/>
      <BuyCreditsModal/>
    </div>
  )
}
