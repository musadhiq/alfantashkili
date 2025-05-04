import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import TopSocialBar from '../../components/utilities/TopSocialBar'
import TopNavbar from '../../components/utilities/TopNavbar'
import { fetchCategories } from '../../store/thunks/productThunks';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';


function UserLayout() {

  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchCategories())
    }, [useDispatch])


  return (
    <div className='min-h-screen'>
      <TopSocialBar />
      <TopNavbar />
      <main className='mb-12'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default UserLayout
