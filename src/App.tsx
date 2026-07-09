// import { MessageCirclePlus } from 'lucide-react'; // icon for add Goal!!! <MessageCirclePlus />
// import { SavePlus } from 'lucide-react'; //icon for save Goal!!! <SavePlus />
// import { Trash2 } from 'lucide-react'; // icon for delete Definite goal <Trash2 />
// import { Settings } from 'lucide-react'; // settings for edit goal  <Settings />
import { useState } from 'react';
import Goal from './components/Goal';

interface GoalUser {
    id: number ;
    titleGoal: string ;
    descGoal: string ;
    statusGoal: boolean ;
}

function App() {

  const [ goalUser, setGoalUser ] = useState<GoalUser[]>([
    {
      id: 1,
      titleGoal: 'Frontend',
      descGoal: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Provident, corrupti architecto aperiam ad suscipit quibusdam',
      statusGoal: true       
    },
    {
      id: 2,
      titleGoal: 'Backend',
      descGoal: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Provident, corrupti architecto aperiam ad suscipit quibusdam',
      statusGoal: true       
    }    
  ])


  return (
    <>
    <main>
      <aside>
        {/* status goals */}
      </aside>

      <section>
        {goalUser.map((goalItem) => (
          <Goal id={goalItem.id} title={goalItem.titleGoal} desc={goalItem.descGoal} status={goalItem.statusGoal}/>
        ))}
      </section>

    </main>
    </>
  )
}

export default App
