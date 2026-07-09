import { MessageCirclePlus } from 'lucide-react'; 
import { BadgeCheck } from 'lucide-react';
import { RectangleEllipsis } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SavePlus } from 'lucide-react';
// import { Trash2 } from 'lucide-react'; // icon for delete Definite goal <Trash2 />
// import { Settings } from 'lucide-react'; // settings for edit goal  <Settings />
import Goal from './components/Goal';
import './global.css'

interface GoalUser {
    id: number ;
    titleGoal: string ;
    descGoal: string ;
    statusGoal: boolean ;
}

function App() {
  const [titleGoalSetter, setTitleGoalSetter ] = useState<string>('')
  const [descGoalSetter, setDescGoalSetter ] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<boolean>(false)
  
  const [ goalUser, setGoalUser ] = useState<GoalUser[]>([
    {
      id: 1,
      titleGoal: 'Frontend',
      descGoal: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, corrupti architecto aperiam ad suscipit quibusdam',
      statusGoal: true       
    },
    {
      id: 2,
      titleGoal: 'Backend',
      descGoal: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, corrupti architecto aperiam ad suscipit quibusdam',
      statusGoal: false       
    }  
  ])

  const [ addGoal, setAddGoal ] = useState<boolean>(false)

  let totalGoal: number = goalUser.length

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!titleGoalSetter.trim() || !descGoalSetter.trim()) {
      setAlertMessage(true)
      return
    }

    const nextId = goalUser.length > 0 
      ? Math.max(...goalUser.map(goal => goal.id)) + 1 
      : 1

    const newGoal: GoalUser = {
      id: nextId,
      titleGoal: titleGoalSetter,
      descGoal: descGoalSetter,
      statusGoal: true
    }
    
    if(goalUser.length === 0) {
      setGoalUser([
        newGoal
      ])
    } else {
        setGoalUser((prevData) => [
          ...prevData, newGoal
        ])
    }

    setTitleGoalSetter('')
    setDescGoalSetter('')
    setAddGoal(false)
  }



  return (
    <>
    {alertMessage && (
      <div className="alert-notification">
        Por favor, preencha todos os campos!
      </div>
    )}

    <main className='bt-body'>
      <aside id='statistic_goal'>
       <ul className='list_storage_filter'>
        {goalUser.map((itemFilter, index) => (
          <li className='filter_goal' key={itemFilter.id}>
            <span>{String(index + 1).padStart(2, '0')}_</span>{itemFilter.titleGoal}
            <div>{itemFilter.statusGoal}</div>
            {itemFilter.statusGoal ? <BadgeCheck size={29} color='yellow'/> : <RectangleEllipsis size={30} color='orange'/>}
          </li>
        ))}
       </ul>

       <div id='counter_goal'>
        <p>Metas totais:</p> {totalGoal}
       </div>
      </aside>

      <section id='manegement'>
        <header id='add_goal_header'>
          <MessageCirclePlus
           color='white'  
           size={36} 
           id='add_goal'
           onClick={() => setAddGoal(true)}
          />
        </header>

        {
          addGoal && (
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>TItulo</span>
                  <input 
                    type="text" 
                    placeholder='Estudar Frontend'
                    value={titleGoalSetter} 
                    onChange={(e) => setTitleGoalSetter(e.target.value)}
                  />
                </label>

                <label>
                  <span>Descrição</span>
                  <input 
                    type="text" 
                    placeholder='Aprender Next.js' 
                    value={descGoalSetter}
                    onChange={(e) => setDescGoalSetter(e.target.value)}
                  />
                </label>      
                <button type="submit">
                  <SavePlus />
                </button>         
              </form>
            </div>
          )
        }

        <div className="area_goal">
          {goalUser.map((goalItem) => (
            <Goal id={goalItem.id} title={goalItem.titleGoal} desc={goalItem.descGoal} status={goalItem.statusGoal}/>
          ))}
        </div>
      </section>

    </main>
    </>
  )
}

export default App