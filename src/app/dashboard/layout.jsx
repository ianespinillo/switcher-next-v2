import {DashboardSidebar} from '@/components/UI/DashboardSidebar';
export default function Sidebar ({ children }) {
  return (
    <div className='w-full flex flex-col md:flex-row'>
      <DashboardSidebar />
      {children}
    </div>
  )
}
