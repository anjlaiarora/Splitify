import { useEffect, useState } from 'react';

import GroupForm from './GroupForm';
import GroupList from './GroupList';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import Summary from './Summary';
import './Splitter.css'; // Import the CSS file for custom styles

function Splitter() {
  const [groups, setGroups] = useState(() => {
    const storedGroups = localStorage.getItem('groups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const addGroup = (group) => {
    setGroups([...groups, { ...group, expenses: [] }]);
  };

  const selectGroup = (index) => {
    setSelectedGroupIndex(index);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    setGroups(newGroups);
    localStorage.setItem('groups', JSON.stringify(newGroups));
    if (selectedGroupIndex === index) {
      setSelectedGroupIndex(null);
    }
  };

  const addExpense = (expense) => {
    const updatedGroups = [...groups];
    updatedGroups[selectedGroupIndex].expenses.push(expense);
    setGroups(updatedGroups);
  };

  return (
    <div className="App">
      <div className="container my-4">
        {/* Stylish Header */}
        <header className="app-header">
          <h1 className="app-title">Expense Splitter</h1>
        </header>

        <div className="row">
          <div className="col-md-4">
            <GroupForm addGroup={addGroup} />
            <GroupList
              groups={groups}
              selectGroup={selectGroup}
              deleteGroup={deleteGroup}
            />
          </div>
          <div className="col-md-8">
            {selectedGroupIndex !== null && (
              <>
                <h2 className="mt-4">
                  Manage Expenses for{' '}
                  {groups[selectedGroupIndex].groupName.toUpperCase()}
                </h2>
                <p>
                  Members: {groups[selectedGroupIndex].members.join(', ')}
                </p>
                <ExpenseForm
                  addExpense={addExpense}
                  members={groups[selectedGroupIndex].members}
                />
                <ExpenseTable
                  expenses={groups[selectedGroupIndex].expenses}
                />
                {groups[selectedGroupIndex].expenses.length > 0 && (
                  <Summary
                    expenses={groups[selectedGroupIndex].expenses}
                    members={groups[selectedGroupIndex].members}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splitter;
