import './App.css'

import { useBasic, useQuery } from '@basictech/react'

function App() {
  const { signin, isSignedIn, user, db, signout} = useBasic()

  const data = useQuery(db.collection('todos').getAll() )


  return (
      <div>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '12px 24px',
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000
        }}>
          {isSignedIn && <p style={{ margin: 0 }}>Signed in as {user?.email}</p>}
          {!isSignedIn ? (
            <button 
              onClick={signin}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #666',
                backgroundColor: 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>
          ) : (
            <button 
              onClick={signout}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #666',
                backgroundColor: 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Sign out
            </button>
          )}
        </div>

        <div style={{ marginTop: '64px', padding: '0 24px' }}>
          <div>
            <input 
              type="text" 
              placeholder="Add a todo..."
              style={{
                padding: '8px 12px',
                width: '300px',
                fontSize: '16px',
                border: '1px solid #444',
                borderRadius: '5px',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                outline: 'none',
                transition: 'border-color 0.2s',
                marginBottom: '16px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#666';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  db.collection('todos').add({
                    title: e.currentTarget.value,
                    completed: false
                  })
                  e.currentTarget.value = ''
                }
              }}
            />
          </div>

          {data.map((item: any) => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                position: 'relative',
                padding: '8px',
                width: 300,
                borderRadius: '5px',
                margin: 2,
                transition: 'background-color 0.2s',
                backgroundColor: 'transparent',
              }}
              onMouseOver={(e) => {
                const button = e.currentTarget.querySelector('button');
                if (button) button.style.opacity = '1';
                e.currentTarget.style.backgroundColor = '#333';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget.querySelector('button');
                if (button) button.style.opacity = '0';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <p>{item.title}</p>
              <button 
                onClick={() => db.collection('todos').delete(item.id)}
                style={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  padding: '4px 4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    
  )
}

export default App
