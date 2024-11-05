import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BasicProvider } from '@basictech/react'

// const config = { 
//   project_id: "7aa7d857-48d5-4963-b519-f782af61ae66",
//   schema : { 

//   }
// }

const schema = { 
  project_id: "5a15ffd6-89fe-4921-a1a0-e411ecd6da97",
  version: 0,
  tables: { 
    todos: { 
      fields: { 
        title: { 
          type: 'string',
        }, 
        completed: { 
          type: 'boolean',
        }
      }
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasicProvider project_id="5a15ffd6-89fe-4921-a1a0-e411ecd6da97" schema={schema} debug >
      <App />
    </BasicProvider>
  </StrictMode>,
)
