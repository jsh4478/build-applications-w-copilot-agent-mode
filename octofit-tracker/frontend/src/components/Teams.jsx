import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => { fetchCollection('teams', 'teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section><div className="mb-4"><p className="text-uppercase text-secondary small mb-1">Competition</p><h2>Teams</h2></div><CollectionState {...state} empty={!teams.length}><div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id || team.id || team.name}><article className="card border-0 shadow-sm h-100"><div className="card-body"><div className="d-flex justify-content-between"><h3 className="h5">{team.name}</h3><strong>{team.totalPoints} pts</strong></div><p className="text-secondary">{team.motto}</p><small>{team.members?.length || 0} members</small></div></article></div>)}</div></CollectionState></section>
}

export default Teams
