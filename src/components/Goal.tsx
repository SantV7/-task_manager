import { FilePen } from 'lucide-react'; // icon for edit goal 
import { useState } from 'react';
import { Type } from 'lucide-react';
import { Play } from 'lucide-react';

interface GoalProps {
  id: number ;
  title: string ;
  desc: string ;
  status: boolean ;
  toggleStatus: (id: number) => void;

  
}

const Goal = ({id, title, desc, status, toggleStatus}: GoalProps) => {

  const [ showSettings, setShowSettings ] = useState<boolean>(false)

  const positionTitle = [
    {position: 'white'},
    {position: 'rgb(165, 159, 252)'},
    {position: 'orange'}
  ]


  const [ colorTitle, setColorTitle ] = useState<number>(0)

  const nameColorTitle = [
    'White',
    'Blue',
    'Orange'
  ]


  return (
    <>
      <div id='goal' key={id}>
        <header id='title_area_goal'>
            <h2 style={{color: `${positionTitle[colorTitle].position}`}} id='task_title'>{title}</h2>
            <FilePen onClick={() => setShowSettings(!showSettings)} id='settings_icon' />
        </header>
        <section>
            <p id='desc_txt'>{desc}</p>
        </section>
        <footer id='footer_status'>
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems:'end', gap: '3px'}}>
              <p id='status'>Status:</p>
              <p>{status ? 'Ativo' : 'Finalizado'}</p>
            </div>
            <div id='btn_changer'>
              <button onClick={() => toggleStatus(id)} style={{backgroundColor: `${status ? 'rgb(27, 27, 44)' :' rgb(106, 106, 209)' }`}} id='btn_change_status'>{status ?  'Finalizar' : 'Ativar'}</button>
            </div>
        </footer>
          {showSettings && (
            <>
              <div>
                <header id='title_config'>
                  <h3>Title</h3>
                  <Type />
                </header>
                <div id='setter_title'>
                   <Play onClick={() => setColorTitle((prevColor) => prevColor - 1 )} style={{rotate: '180deg'}}/>
                   <p>Center</p>
                   <Play onClick={() => setColorTitle((prevColor) => prevColor + 1 )}/>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  )
}

export default Goal