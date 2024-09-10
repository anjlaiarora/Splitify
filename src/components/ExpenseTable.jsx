import React from 'react';
import { motion } from 'framer-motion';

function ExpenseTable({ expenses }) {
  return (
    <motion.div
      className="card mb-4 shadow-lg"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body bg-light">
        <h5 className="card-title text-center">Expenses</h5>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Payer</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>₹{expense.amount.toFixed(2)}</td>
                <td>{expense.payer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ExpenseTable;
