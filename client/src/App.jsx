
import './App.css'
import { Separator } from './components/ui/separator'
import BaseNav from './user/components/BaseNav'
import CategorizedProducts from './user/components/CategorizedProducts'
import NewProducts from './user/components/NewProducts'

function App() {
  return (
    <main className='min-h-[100vh] flex flex-col bg-slate-200 max-w-[100vw]'>
      <BaseNav />
      <div className='mx-12'>
        <NewProducts />
        <Separator />
        <p className='my-3 text-start'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio possimus nulla id fugit temporibus nisi doloremque harum voluptas atque eveniet, earum quod, nobis necessitatibus voluptate voluptatum? Rerum nostrum soluta ipsum?</p>
        <CategorizedProducts />
      </div>
    </main>
  )
}

export default App
