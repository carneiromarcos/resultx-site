import './Clients.css'

const CLIENTS = [
  'Tetra Oil', 'Emprega+', 'Madre Pizza', 'Rede Tetra',
  'Paróquia SVP', 'Flash Model', 'Electia',
  'Tetra Oil', 'Emprega+', 'Madre Pizza', 'Rede Tetra',
  'Paróquia SVP', 'Flash Model', 'Electia',
]

export default function Clients() {
  return (
    <section id="clients">
      <p className="clients-label">Empresas que confiam na ResultX</p>
      <div className="clients-track">
        {CLIENTS.map((name, i) => (
          <span key={i} className="client-logo">{name}</span>
        ))}
      </div>
    </section>
  )
}
