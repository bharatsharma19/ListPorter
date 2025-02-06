import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TransferList from "./TransferList";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [error, setError] = useState("");

  // Function to divide users into two equal halves
  const divideUsers = (users) => {
    if (!users || users.length === 0) return; // Prevent errors if users are empty
    const mid = Math.floor(users.length / 2);
    setLeft(users.slice(0, mid));
    setRight(users.slice(mid));
  };

  // Fetch users from API
  const getData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      } else {
        setUsers([]); // Ensure state updates correctly
      }
    } catch (error) {
      setError(error.message || "Failed to fetch users");
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    getData();
  }, [getData]);

  // Run divideUsers whenever users change
  useEffect(() => {
    if (users.length > 0) {
      divideUsers(users);
    }
  }, [users]);

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" fontWeight="bold">
          User Transfer List
        </Typography>
      </Box>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : users.length > 0 ? (
        <TransferList leftUsers={left} rightUsers={right} />
      ) : (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default App;
