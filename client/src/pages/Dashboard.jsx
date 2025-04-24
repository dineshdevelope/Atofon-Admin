import { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/bg-pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              maxWidth: 500,
              width: "100%",
              borderRadius: 4,
              textAlign: "center",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar
                src="https://atofon.com/assets/images/atofon.svg"
                alt="User Avatar"
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              />
            </motion.div>

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Welcome to Atofon Tech Private Limited
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Hello, <strong>{user?.username}</strong>! Thank you for visiting
              this site.
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
