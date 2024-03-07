import {DashboardSidebar} from '@/components/UI/DashboardSidebar';
export default function Sidebar ({ children }) {
  return (
    <>
    <div className='w-full flex flex-col md:flex-row'>
      {/* Navigation */}
      <DashboardSidebar />
      {/* Child Elements */}
      {children}
    </div>
    </>
  )
}
