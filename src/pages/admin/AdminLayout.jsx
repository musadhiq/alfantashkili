import { Outlet } from 'react-router-dom';
import NavBar from '../../components/navBar';


function AdminLayout() {

  return (
    <div className='min-h-screen'>
      <NavBar />
      <main className='mb-12'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
