import Loader from '../components/Loader'

export default function Button({ title, loading, ghost, secondary, full, onClick, active, contrast }) {
  return (
    <button 
      disabled={active}
      onClick={onClick}
      className={`btn ${contrast && 'bg-red-500 text-white'} ${active && 'opacity-20'} ${ghost && 'neo-ghost'} ${full && 'w-full'} ${secondary && 'secondary'}`}
    >{loading ? <Loader show={loading} small /> : title}
    </button>
  )
}
