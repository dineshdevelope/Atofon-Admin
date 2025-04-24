import { useContext } from "react";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard
      </Typography>
      <Typography variant="body1">
        Hello, {user?.username}! You are logged in as a {user?.role}.
      </Typography>
    </Box>
  );
};

export default Dashboard;
