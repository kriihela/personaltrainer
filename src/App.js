import React, { useState } from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './Calendar';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">

      <div class="header">
        <h1>Personal trainer</h1>
      </div>

      <Tabs value={value} onChange={handleChange}>
        <Tab value='one' label='CUSTOMER' />
        <Tab value='two' label='TRAINING' />
        <Tab value='three' label='CALENDAR' />
      </Tabs>

      {
        value === 'one' && <div>
          <Customerlist />
        </div>
      }
      {
        value === 'two' && <div>
          <Traininglist />
        </div>
      }
      {
        value === 'three' && <div>
          <Calendar />
        </div>
      }
    </div>
  );
}

export default App;
