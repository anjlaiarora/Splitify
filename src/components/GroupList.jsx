import React from 'react';
import { motion } from 'framer-motion';

function GroupList({ groups, selectGroup, deleteGroup }) {
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      deleteGroup(index);
    }
  };

  return (
    <motion.div
      className="card mb-4 shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body bg-light">
        <h5 className="card-title text-center">Groups</h5>
        <ul className="list-group">
          {groups.map((group, index) => (
            <motion.li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span onClick={() => selectGroup(index)} style={{ cursor: 'pointer' }}>
                {group.groupName} ({group.members.length} members)
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default GroupList;
