import { useEffect } from "react";
import deleteIcon from "../../images/delete.svg";
import editIcon from "../../images/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { editActive, fetchTransactions, removeTransactions } from "../../features/transation/transationsSlice";
function Transaction() {
  const dispatch = useDispatch();
  const { transactions, isError, isLoading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const editHandler = (transaction) => {
    dispatch(editActive(transaction));
    
  };
  const deleteHandler = (id) => {
    dispatch(removeTransactions(id));
  };

  let content ;

  if (isLoading) content = <p>...loading</p>;
  if (!isLoading && isError) content =<p className="error"> { error }</p>
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>No transactions yet</p>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <li className={`transaction ${transaction.type}` } key={transaction.id}>
        <p>{transaction.name}</p>
        <div className="right">
          <p>{transaction.amount}</p>
          <button className="link">
            <img alt="edit" className="icon" src={editIcon} onClick={()=>editHandler(transaction)} />
          </button>
          <button className="link">
            <img alt="delete" className="icon" src={deleteIcon} onClick={()=>deleteHandler(transaction.id)} />
          </button>
        </div>
      </li>
    ));

  }


  return (
    <div>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>
          {/* <li className="transaction income">
            <p>Earned this month</p>
            <div className="right">
              <p>৳ 100</p>
              <button className="link">
                <img alt="edit" className="icon" src={editIcon} />
              </button>
              <button className="link">
                <img alt="delete" className="icon" src={deleteIcon} />
              </button>
            </div>
          </li> */}
          {content}
        </ul>
      </div>
    </div>
  );
}

export default Transaction;
