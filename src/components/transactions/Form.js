import React, { useEffect, useState } from "react";
import {
  changeTransactions,
  createTransactions,
  editInActive,
} from "../../features/transation/transationsSlice";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const [input, setInput] = useState();
  const [amountIncome, setAmountIncome] = useState();
  const [type, setType] = useState();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const editingActions = useSelector(
    (state) => state.transaction.editing || {}
  );
  const { isLoading, isError } = useSelector((state) => state.transaction);

  useEffect(() => {
    const { id, name, amount, type } = editingActions;
    if (id) {
      setInput(name);
      setAmountIncome(amount);
      setType(type);
      setEditMode(true);
    } else {
      reset();
      setEditMode(false);
    }
  }, [editingActions]);

  const reset = () => {
    setInput("");
    setAmountIncome("");
    setType("");
  };
  const formHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name: input,
        amount: Number(amountIncome),
        type,
      })
    );
    reset();
  };

  const EditFormHandler = (e) => {
    e.preventDefault();
    dispatch(
      changeTransactions({
        id: editingActions?.id,
        data: {
          name: input,
          amount: Number(amountIncome),
          type,
        },
      })
    );
    reset();
    setEditMode(false);
  };

  const cancelEditing = () => {
    dispatch(editInActive);
    setEditMode(false);
    reset();
  };
  return (
    <>
      {editMode ? (
        <div className="form  updateForm">
          <h3>update transaction</h3>
          <form onSubmit={EditFormHandler}>
            <div className="form-group">
              <label htmlFor="transaction_name">Name</label>
              <input
                required
                type="text"
                name="transaction_name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="form-group radio">
              <label for="type">Type</label>
              <div className="radio_group">
                <input
                  type="radio"
                  value="income"
                  name="type"
                  id="typeIncome"
                  checked={type === "income"}
                  onChange={() => setType("income")}
                />
                <label htmlFor="typeIncome">Income</label>
              </div>
              <div className="radio_group">
                <input
                  type="radio"
                  value="expense"
                  name="type"
                  id="typeExpense"
                  checked={type === "expense"}
                  onChange={() => setType("expense")}
                />
                <label htmlFor="typeExpense">Expense</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="transaction_amount">Amount</label>
              <input
                required
                type="number"
                name="transaction_amount"
                value={amountIncome}
                onChange={(e) => setAmountIncome(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn">
              Add Transaction
            </button>
            {!isLoading && isError &&(<p className="error"> An Error Occured</p>)}

            <button className="btn cancel_edit" onClick={cancelEditing}>
              Cancel Edit
            </button>
          </form>
        </div>
      ) : (
        <div className="form">
          <h3>Add new transaction</h3>
          <form onSubmit={formHandler}>
            <div className="form-group">
              <label htmlFor="transaction_name">Name</label>
              <input
                required
                type="text"
                name="transaction_name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="form-group radio">
              <label htmlFor="type">Type</label>
              <div className="radio_group">
                <input
                  type="radio"
                  value="income"
                  name="type"
                  id="typeIncome"
                  checked={type === "income"}
                  onChange={() => setType("income")}
                />
                <label htmlFor="typeIncome">Income</label>
              </div>
              <div className="radio_group">
                <input
                  type="radio"
                  value="expense"
                  name="type"
                  id="typeExpense"
                  checked={type === "expense"}
                  onChange={() => setType("expense")}
                />
                <label htmlFor="typeExpense">Expense</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="transaction_amount">Amount</label>
              <input
                required
                type="number"
                name="transaction_amount"
                value={amountIncome}
                onChange={(e) => setAmountIncome(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn">
              Add Transaction
            </button>
            {!isLoading && isError && (<p className="error"> An Error Occured</p>)}
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
