
import TransactionTopCart from "./TransactionTopCart";
import Transaction from "./Transaction";
import Form from "./Form";
function Transactions() {
  return (
    <div className="container">
      <TransactionTopCart />
      <Form />
      <Transaction />
    </div>
  );
}

export default Transactions;
