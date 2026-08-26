import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('workouts', 'workouts').then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section><div className="mb-4"><p className="text-uppercase text-secondary small mb-1">For your next session</p><h2>Workouts</h2></div><CollectionState {...state} empty={!workouts.length}><div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id || workout.id || workout.title}><article className="card border-0 shadow-sm h-100"><div className="card-body"><div className="d-flex justify-content-between gap-2"><h3 className="h5">{workout.title}</h3><span className="badge text-bg-success">{workout.durationMinutes} min</span></div><p className="text-secondary text-capitalize">{workout.category} · {workout.difficulty}</p><ul className="small mb-0">{(workout.exercises || []).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></article></div>)}</div></CollectionState></section>
}

export default Workouts
