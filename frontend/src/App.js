import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TransferList from "./TransferList";

function App() {
  const [users, setUsers] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [error, setError] = useState("");

  const divideUsers = (users) => {
    let len = users.length;
    let left = [],
      right = [];

    for (let i = 0; i < len / 2; i++) {
      left.push(users[i]);
    }
    for (let i = len / 2 + 1; i < len; i++) {
      right.push(users[i]);
    }

    setLeft(left);
    setRight(right);
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data.data);
      divideUsers(response.data.data);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {users && users.length > 0 ? (
        <TransferList leftUsers={left} rightUsers={right} />
      ) : (
        <div>No Users Found</div>
      )}

      {error ? error : ""}
    </div>
  );
}

export default App;
