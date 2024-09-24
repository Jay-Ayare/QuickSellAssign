import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import GroupSelector from './GroupSelector';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Initial grouping by status

  useEffect(() => {
    // Fetch API data
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="app-container">
      <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} />
    </div>
  );
};

export default App;