import React from 'react';

function SummaryTable({ expenses, members }) {
  // Calculate the total amount spent
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Initialize balances for each member
  const memberBalances = members.reduce((acc, member) => {
    acc[member] = 0;
    return acc;
  }, {});

  // Calculate each member's balance
  expenses.forEach((expense) => {
    const share = expense.amount / members.length;
    members.forEach(member => {
      if (member === expense.payer) {
        memberBalances[member] += expense.amount - share;
      } else {
        memberBalances[member] -= share;
      }
    });
  });

  // Separate members into those who owe and those who are owed
  const creditors = [];
  const debtors = [];
  members.forEach(member => {
    if (memberBalances[member] > 0) {
      creditors.push({ name: member, balance: memberBalances[member] });
    } else if (memberBalances[member] < 0) {
      debtors.push({ name: member, balance: memberBalances[member] });
    }
  });

  // Determine who owes whom and how much
  const transactions = [];
  let creditorIndex = 0;
  let debtorIndex = 0;

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    const amount = Math.min(creditor.balance, -debtor.balance);

    transactions.push({
      from: debtor.name,
      to: creditor.name,
      amount: amount
    });

    // Update balances
    creditors[creditorIndex].balance -= amount;
    debtors[debtorIndex].balance += amount;

    // Move to the next creditor or debtor if their balance is settled
    if (creditors[creditorIndex].balance === 0) creditorIndex++;
    if (debtors[debtorIndex].balance === 0) debtorIndex++;
  }

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Summary</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Member</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member}>
                <td>{member}</td>
                <td className={memberBalances[member] > 0 ? 'text-success' : 'text-danger'}>
                  {memberBalances[member] > 0 ? 'Owed' : 'Owes'} ₹{Math.abs(memberBalances[member]).toFixed(2)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h5 className="mt-4">Who Owes Whom</h5>
        <ul className="list-group">
          {transactions.map((transaction, index) => (
            <li key={index} className="list-group-item">
              {transaction.from} owes {transaction.to} ₹{transaction.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}                                                                         

export default SummaryTable;
