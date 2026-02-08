import ManualEditor from './ManualEditor';
import AIVideoCreator from './AIVideoCreator';
import Scheduling from './Scheduling';
import Analytics from './Analytics';
import AIApprovalPanel from './AIApprovalPanel';

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 font-bold text-2xl">AI Platform Dashboard</header>
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ManualEditor />
        <AIVideoCreator />
        <Scheduling />
        <Analytics />
        <AIApprovalPanel />
      </main>
    </div>
  );
}
