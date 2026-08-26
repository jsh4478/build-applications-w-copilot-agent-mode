export function CollectionState({ loading, error, empty, children }) {
  if (loading) return <p className="text-secondary">Loading...</p>
  if (error) return <p className="alert alert-danger mb-0">{error}</p>
  if (empty) return <p className="text-secondary mb-0">No records yet.</p>
  return children
}
