import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('activities', 'activities').then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <section><div className="mb-4"><p className="text-uppercase text-secondary small mb-1">Movement log</p><h2>Recent activities</h2></div><CollectionState {...state} empty={!activities.length}><div className="list-group shadow-sm">{activities.map((activity) => <article className="list-group-item py-3" key={activity._id || activity.id}><div className="d-flex justify-content-between gap-3"><div><h3 className="h6 mb-1 text-capitalize">{activity.type} <span className="text-secondary fw-normal">by {activity.user?.name || activity.user || 'member'}</span></h3><p className="text-secondary mb-0">{activity.durationMinutes} minutes{activity.distanceKm ? ` · ${activity.distanceKm} km` : ''}</p></div><span className="badge text-bg-warning align-self-start">{activity.calories} kcal</span></div></article>)}</div></CollectionState></section>
}

export default Activities
