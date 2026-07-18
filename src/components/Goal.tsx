import { FilePen } from 'lucide-react'; 
import { Type } from 'lucide-react';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';

interface GoalProps {
  id: number ;
  title: string ;
  desc: string ;
  status: boolean ;
  deleteItem: (id:number) => void;
  toggleStatus: (id: number) => void;
  editItem: (id: number, newTitle: string, newDesc: string) => void;
}

const Goal = ({id, title, desc, status, toggleStatus, deleteItem, editItem}: GoalProps) => {

  const [ showSettings, setShowSettings ] = useState<boolean>(false)
  const [ isEditing, setIsEditing ] = useState<boolean>(false)
  const [ editTitle, setEditTitle ] = useState<string>(title)
  const [ editDesc, setEditDesc ] = useState<string>(desc)

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

  const handleSave = () => {
    if (editTitle.trim() && editDesc.trim()) {
      editItem(id, editTitle, editDesc)
      setIsEditing(false)
    }
  }

  return (
    <>
      <div id='goal' key={id}>
        <header id='title_area_goal'>
            {isEditing ? (
              <input 
                className='input_add'
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ fontSize: '1.1rem', padding: '2px 6px', width: '65%' }}
              />
            ) : (
              <h2 style={{color: `${positionTitle[colorTitle].position}`}} id='task_title'>{title}</h2>
            )}
            <div id='icons_edit_goal'>
              {isEditing ? (
                <Check onClick={handleSave} className='settings_icon' color='#4ade80' />
              ) : (
                <FilePen onClick={() => {
                  setShowSettings(!showSettings)
                  setIsEditing(true)
                }} className='settings_icon' />
              )}
              <Trash2 onClick={() => deleteItem(id)} className='settings_icon' color=' rgb(255, 136, 0)' />
            </div>
        </header>
        <section>
            {isEditing ? (
              <input 
                className='input_add'
                type="text" 
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                style={{ fontSize: '1rem', padding: '2px 6px', width: '100%', marginTop: '8px' }}
              />
            ) : (
              <p id='desc_txt'>{desc}</p>
            )}
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
              <div id='config_goal'>
                <header id='title_config'>
                  <h3>Title</h3>
                  <Type />
                </header>
                <div id='setter_title'>
                   <Play onClick={() => setColorTitle((prevColor) => Math.max(0, prevColor - 1) )} style={{rotate: '180deg'}}/>
                   <p>{nameColorTitle[colorTitle]}</p>
                   <Play onClick={() => setColorTitle((prevColor) => Math.min(positionTitle.length - 1, prevColor + 1))}/>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  )
}

export default Goal