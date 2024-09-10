import React, { useState } from 'react';
import { motion } from 'framer-motion';

function GroupForm({ addGroup }) {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);  // Toggle state

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberList = members.split(',').map(member => member.trim());
    if (groupName && memberList.length > 1) {
      addGroup({ groupName, members: memberList });
      setGroupName('');
      setMembers('');
      setIsFormVisible(false);  // Close form after submission
    }
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <button 
        className="btn btn-primary mb-3"
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? 'Hide Form' : 'Create New Group'}
      </button>

      {isFormVisible && (
        <motion.div
          className="card mb-4 shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-body bg-light">
            <h5 className="card-title text-center">Create New Group</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Members (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Members"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3 w-100">Create Group</button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default GroupForm;
