import React, { useState } from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import Charts from './components/Charts';

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
        <Tab value='four' label='CHARTS' />
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
      {
        value === 'four' && <div>
          <Charts />
        </div>
      }
    </div>
  );
}

export default App;
