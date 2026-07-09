import { FilePen } from 'lucide-react'; // icon for edit goal 

interface GoalProps {
    id: number ;
    title: string ;
    desc: string ;
    status: boolean ;
}

const Goal = ({id, title, desc, status}: GoalProps) => {
  return (
    <>
      <div key={id}>
        <header>
            <h2>{title}</h2>
            <FilePen />
        </header>
        <section>
            <p>{desc}</p>
        </section>
        <footer>
            <p>Status: {status ? 'Ativo' : 'Finalizado'}</p>
        </footer>
      </div>
    </>
  )
}

export default Goal