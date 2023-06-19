import React, { useState } from "react";
import * as fcl from "@blocto/fcl";
import styled from 'styled-components';

const Card = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Code = styled.pre`
  background: #f0f0f0;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
  padding: 5px;
`;

const SendTransaction = () => {
  const [status, setStatus] = useState("Not started");
  const [transaction, setTransaction] = useState(null);
  const [simpleTransaction, setSimpleTransaction] = useState(`\
transaction {
    prepare(acct: AuthAccount) {

        acct.unlink(/public/flowTokenReceiver)
      
   }
  execute {
    log("Hello World!!")
  }
}
`);

  const sendTransaction = async (event) => {
    event.preventDefault();

    setStatus("Resolving...");

    try {
      const tx = await fcl.send([
        fcl.transaction(simpleTransaction),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(100)
      ]);

      const { transactionId } = tx;

      setStatus(`Transaction (${transactionId}) sent, waiting for confirmation`);

      const unsub = fcl
        .tx(transactionId)
        .subscribe(transaction => {
          setTransaction(transaction);

          if (fcl.tx.isSealed(transaction)) {
            setStatus(`Transaction (${transactionId}) is Sealed`);
            unsub();
          }
        });
    } catch (error) {
      console.error(error);
      setStatus("Transaction failed");
    }
  };

  const handleTransactionChange = (event) => {
    setSimpleTransaction(event.target.value);
  };

  return (
    <Card>
      <Header>send transaction</Header>

      <textarea value={simpleTransaction} onChange={handleTransactionChange} />

      <button onClick={sendTransaction}>Send</button>

      <Code>Status: {status}</Code>

      {transaction && <Code>{JSON.stringify(transaction, null, 2)}</Code>}
    </Card>
  );
};

export default SendTransaction;
