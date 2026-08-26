import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('leaderboard', 'leaderboard').then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section><div className="mb-4"><p className="text-uppercase text-secondary small mb-1">Weekly challenge</p><h2>Leaderboard</h2></div><CollectionState {...state} empty={!entries.length}><div className="list-group shadow-sm">{entries.map((entry) => <div className="list-group-item d-flex align-items-center gap-3 py-3" key={entry._id || entry.id || entry.rank}><span className="fs-4 fw-bold text-secondary">#{entry.rank}</span><div className="flex-grow-1"><strong>{entry.user?.name || entry.user || 'Member'}</strong><div className="text-secondary small">{entry.period || 'weekly'}</div></div><span className="fw-bold">{entry.points} pts</span></div>)}</div></CollectionState></section>
}

export default Leaderboard
