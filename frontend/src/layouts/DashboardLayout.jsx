export default function DashboardLayout({children}){

  return (
    <div style={{display:"flex"}}>

      <div style={{width:220, background:"#111", color:"#fff"}}>
        <h3>AI Platform</h3>

        <a href="/dashboard">Dashboard</a><br/>
        <a href="/calendar">Calendar</a><br/>
        <a href="/analytics">Analytics</a><br/>
        <a href="/pricing">Billing</a><br/>
      </div>

      <div style={{flex:1,padding:30}}>
        {children}
      </div>

    </div>
  );
}
