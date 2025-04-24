import { useContext } from "react";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body1">
        Welcome, Admin {user?.username}! You have special privileges here.
      </Typography>
    </Box>
  );
};

export default Admin;
