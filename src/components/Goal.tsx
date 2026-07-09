import { FilePen } from 'lucide-react'; // icon for edit goal 
import { useState } from 'react';

interface GoalProps {
    id: number ;
    title: string ;
    desc: string ;
    status: boolean ;
}

const Goal = ({id, title, desc, status}: GoalProps) => {

  const [ settings, setSettings ] = useState<boolean>(false)

  return (
    <>
      <div id='goal' key={id}>
        <header id='title_area_goal'>
            <h2 id='task_title'>{title}</h2>
            <FilePen onClick={() => setSettings(!settings)} id='settings_icon' />
        </header>
        <section>
            <p id='desc_txt'>{desc}</p>
        </section>
        <footer id='footer_status'>
            <p id='status'>Status:</p>
            <p>{status ? 'Ativo' : 'Finalizado'}</p>
        </footer>
      </div>
    </>
  )
}

export default Goal