import React from 'react';

const GroupSelector = ({ groupBy, setGroupBy }) => {
  return (
    <div className="group-selector">
      <label htmlFor="grouping">Grouping:</label>
      <select
        id="grouping"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
      >
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default GroupSelector;