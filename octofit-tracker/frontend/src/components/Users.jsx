import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('users', 'users')
      .then((items) => setUsers(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><p className="text-uppercase text-secondary small mb-1">Community</p><h2>Members</h2></div>
        <span className="badge text-bg-primary">{users.length} active</span>
      </div>
      <CollectionState {...state} empty={!users.length}>
        <div className="row g-3">{users.map((user) => <div className="col-md-6 col-xl-4" key={user._id || user.id || user.email}><article className="card h-100 border-0 shadow-sm"><div className="card-body"><div className="d-flex gap-3 align-items-center"><div className="rounded-circle bg-primary-subtle text-primary fw-bold p-3">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div><div><h3 className="h5 mb-1">{user.name}</h3><p className="text-secondary mb-2">{user.email}</p><div className="d-flex flex-wrap gap-1">{(user.goals || []).map((goal) => <span className="badge text-bg-light" key={goal}>{goal}</span>)}</div></div></div></div></article></div>)}</div>
      </CollectionState>
    </section>
  )
}

export default Users
