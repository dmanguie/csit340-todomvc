import Todos from './Components/Todos.jsx'
import Info from './Components/Info.jsx'

function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 font-light text-[#111]">
      <Todos />
      <Info name="Danielle Manguilimotan" />
    </div>
  )
}

export default App