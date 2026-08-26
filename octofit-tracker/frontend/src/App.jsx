import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Members'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return <section><p className="text-uppercase text-secondary small mb-1">OctoFit Tracker</p><h1 className="display-5 fw-bold mb-3">Make every move count.</h1><p className="lead text-secondary">Track your momentum, rally your team, and find your next best workout.</p><div className="row g-3 mt-4"><div className="col-md-4"><div className="p-4 bg-primary text-white rounded-3 h-100"><h2 className="h5">Log activity</h2><p className="mb-0">Turn today&apos;s effort into progress.</p></div></div><div className="col-md-4"><div className="p-4 bg-warning rounded-3 h-100"><h2 className="h5">Join the challenge</h2><p className="mb-0">See how your team is climbing.</p></div></div><div className="col-md-4"><div className="p-4 bg-success text-white rounded-3 h-100"><h2 className="h5">Find your flow</h2><p className="mb-0">Pick a workout that fits today.</p></div></div></div></section>
}

function App() {
  return <div className="app-shell"><header className="navbar navbar-expand-lg border-bottom bg-white"><div className="container py-2"><NavLink className="navbar-brand fw-bold text-primary" to="/">OctoFit</NavLink><nav className="d-flex flex-wrap gap-2" aria-label="Primary navigation">{navigation.map(([path, label]) => <NavLink className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`} key={path} to={path}>{label}</NavLink>)}</nav></div></header><main className="container py-5"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main></div>
}

export default App
