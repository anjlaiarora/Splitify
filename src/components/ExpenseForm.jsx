import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ExpenseForm({ addExpense, members }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(members[0] || '');
  const [splitType, setSplitType] = useState('equally');
  const [customSplits, setCustomSplits] = useState(() => members.map(() => ''));

  const handleSplitChange = (index, value) => {
    const newSplits = [...customSplits];
    newSplits[index] = value;
    setCustomSplits(newSplits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !payer) return;

    let finalSplits;
    if (splitType === 'equally') {
      const equalShare = parseFloat(amount) / members.length;
      finalSplits = members.map(member => ({ member, share: equalShare }));
    } else {
      const totalCustomSplit = customSplits.reduce((sum, split) => sum + parseFloat(split || 0), 0);
      if (totalCustomSplit !== parseFloat(amount)) {
        alert('It should be the total of the amount');
        return;
      }
      finalSplits = members.map((member, index) => ({
        member,
        share: parseFloat(customSplits[index] || 0),
      }));
    }

    addExpense({ name, amount: parseFloat(amount), payer, splits: finalSplits });
    setName('');
    setAmount('');
    setPayer(members[0] || '');
    setCustomSplits(members.map(() => ''));
  };

  return (
    <motion.div
      className="card mb-4 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body bg-light">
        <h5 className="card-title text-center">Add Expense</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Expense Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter expense name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Payer</label>
            <select
              className="form-control"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
            >
              {members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Split Type</label>
            <div>
              <label className="mr-3">
                <input
                  type="radio"
                  value="equally"
                  checked={splitType === 'equally'}
                  onChange={() => setSplitType('equally')}
                />{' '}
                Split Equally
              </label>
              <label>
                <input
                  type="radio"
                  value="custom"
                  checked={splitType === 'custom'}
                  onChange={() => setSplitType('custom')}
                />{' '}
                Custom Split
              </label>
            </div>
          </div>
          {splitType === 'custom' && (
            <div className="form-group">
              <label>Custom Splits</label>
              {members.map((member, index) => (
                <div key={index} className="input-group mb-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text">{member}</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    value={customSplits[index]}
                    onChange={(e) => handleSplitChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="btn btn-success btn-block mt-3">
            <i className="fa fa-plus"></i> Add Expense
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ExpenseForm;
