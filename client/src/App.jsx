
import { Outlet } from 'react-router-dom'
import './App.css'
import BaseNav from './user/components/BaseNav'


function App() {
  return (
    <main className='min-h-[100vh] flex flex-col bg-slate-200 max-w-[100vw]'>
      <BaseNav />
      <div className='mx-12 mb-10'>
        <Outlet />
      </div>
    </main>
  )
}

export default App