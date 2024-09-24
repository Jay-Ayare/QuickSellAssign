import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users, groupBy }) => {
  const [sortedTickets, setSortedTickets] = useState([]);

  useEffect(() => {
    setSortedTickets(tickets);
  }, [tickets]);

  const handleSortByTitle = () => {
    const sorted = [...sortedTickets].sort((a, b) => a.title.localeCompare(b.title));
    setSortedTickets(sorted);
  };
    
  const groupedTasks = groupBy === 'status'
    ? groupByStatus(sortedTickets)
    : groupBy === 'priority'
    ? groupByPriority(sortedTickets)
    : groupByUser(sortedTickets, users);

  return (
      <div>
        <button className='btnttl' onClick={handleSortByTitle}>Sort by Title</button> 

    <div className="kanban-board">
      {Object.keys(groupedTasks).map(group => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {groupedTasks[group].map(ticket => (
            <div key={ticket.id} className="kanban-card">
              <p><strong>{ticket.title}</strong></p>
              <p>{ticket.tag.join(', ')}</p>
              <p>Status: {ticket.status}</p>
              <p>Priority: {ticket.priority}</p>
              <p>User: {users.find(user => user.id === ticket.userId)?.name || "Unassigned"}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

// Group by Status
const groupByStatus = tickets => {
  return tickets.reduce((acc, ticket) => {
    const status = ticket.status;
    acc[status] = acc[status] || [];
    acc[status].push(ticket);
    return acc;
  }, {});
};

// Group by Priority
const groupByPriority = tickets => {
  return tickets.reduce((acc, ticket) => {
    const priority = `Priority ${ticket.priority}`;
    acc[priority] = acc[priority] || [];
    acc[priority].push(ticket);
    return acc;
  }, {});
};

// Group by User
const groupByUser = (tickets, users) => {
  return tickets.reduce((acc, ticket) => {
    const user = users.find(user => user.id === ticket.userId)?.name || "Unassigned";
    acc[user] = acc[user] || [];
    acc[user].push(ticket);
    return acc;
  }, {});
};

export default KanbanBoard;