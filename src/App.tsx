import { MessageCirclePlus } from 'lucide-react'; 
import { BadgeCheck } from 'lucide-react';
import { RectangleEllipsis } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SavePlus } from 'lucide-react';
import Goal from './components/Goal';
import './global.css'

interface GoalUser {
  id: number ;
  titleGoal: string ;
  descGoal: string ;
  statusGoal: boolean ;
}

function App() {
  const [titleGoalSetter, setTitleGoalSetter] = useState<string>('')
  const [descGoalSetter, setDescGoalSetter] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<boolean>(false)
  const [addGoal, setAddGoal] = useState<boolean>(false)
  
  const [goalUser, setGoalUser] = useState<GoalUser[]>(() => {
    const savedGoals = localStorage.getItem('user_goals')
    if (savedGoals) {
      return JSON.parse(savedGoals)
    }
    return [
      {
        id: 1,
        titleGoal: '1° Adicionar meta ',
        descGoal: 'Basta clicar no button cinza, adicionar um titulo e uma meta/descrição',
        statusGoal: true       
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('user_goals', JSON.stringify(goalUser))
  }, [goalUser])

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  function deleteGoal(id: number) {
    setGoalUser((prevGoals) => prevGoals.filter(goalUser => goalUser.id !== id))
  }

  function editGoal(id: number, newTitle: string, newDesc: string) {
    setGoalUser(prev => prev.map(item => 
      item.id === id ? { ...item, titleGoal: newTitle, descGoal: newDesc } : item
    ))
  }

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
    
    setGoalUser((prevData) => [...prevData, newGoal])

    setTitleGoalSetter('')
    setDescGoalSetter('')
    setAddGoal(false)
  }

  let totalGoal: number = goalUser.length

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
            {itemFilter.statusGoal 
             ? <BadgeCheck size={29} color='yellow'/> 
             : <RectangleEllipsis size={30} color='orange'
            />}
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
           size={55} 
           id='add_goal'
           onClick={() => setAddGoal(true)}
          />
        </header>

        {
          addGoal && (
            <div>
              <form id='add_goal_style' onSubmit={handleSubmit}>
                <label className='label_add_goal'>
                  <span>TItulo</span>
                  <input
                    className='input_add' 
                    type="text" 
                    placeholder='Estudar...'
                    value={titleGoalSetter} 
                    onChange={(e) => setTitleGoalSetter(e.target.value)}
                  />
                </label>

                <label className='label_add_goal'>
                  <span>Meta</span>
                  <input
                    className='input_add' 
                    type="text" 
                    placeholder='Aprender...' 
                    value={descGoalSetter}
                    onChange={(e) => setDescGoalSetter(e.target.value)}
                  />
                </label>      
                <button id='add_btn' type="submit">
                  <SavePlus size={35} />
                </button>         
              </form>
            </div>
          )
        }

        <div className="area_goal">
          {goalUser.map((goalItem) => (
            <Goal 
              key={goalItem.id}
              id={goalItem.id} 
              title={goalItem.titleGoal} 
              desc={goalItem.descGoal} 
              status={goalItem.statusGoal} 
              deleteItem={deleteGoal} 
              editItem={editGoal}
              toggleStatus={(id) => {
                setGoalUser(prev => prev.map(item => 
                  item.id === id ? { ...item, statusGoal: !item.statusGoal } : item
                ))
              }}
            />
          ))}
        </div>
      </section>

    </main>
    </>
  )
}

export default App