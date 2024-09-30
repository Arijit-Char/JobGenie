import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  React.useEffect(() => {
    if (message) {
      localStorage.removeItem("token");
      toast.success(message, { position: "bottom-center" });
      navigate("/");
    } else if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      console.error("Error logging in:", error);
    }
  }, [error, message, dispatch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleOptionClick = (route) => {
    navigate(route);
    closeMobileMenu(); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginTop: "1rem" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" }, color: "#FFFFFF" }}
          >
            JobGenie
          </Typography>

          <IconButton
            className="signup-button"
            size="small"
            color="inherit"
            variant="contained"
            onClick={() => navigate("/")}
            style={{ marginLeft: "2rem", fontSize: "1rem" }}
          >
            Home
          </IconButton>
          <IconButton
            className="signup-button"
            size="small"
            color="inherit"
            variant="contained"
            onClick={() => navigate("/pjobs")}
            style={{ fontSize: "1rem" }}
            disabled={!localStorage.getItem("token")}
          >
            Jobs
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop view buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {localStorage.getItem("token") ? (
              <IconButton
                className="signup-button"
                size="small"
                color="inherit"
                variant="contained"
                onClick={handleLogout}
                style={{ fontSize: "1rem" }}
              >
                Logout
              </IconButton>
            ) : (
              <>
                <IconButton
                  className="signup-button"
                  size="small"
                  color="inherit"
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Login
                </IconButton>
                <IconButton
                  className="signup-button"
                  size="small"
                  color="inherit"
                  onClick={() => navigate("/registration")}
                >
                  Signup
                </IconButton>
              </>
            )}
          </Box>

          {/* Mobile view button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleMobileMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {localStorage.getItem("token") ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button onClick={() => handleOptionClick("/login")}>
                  Login
                </button>
                <button onClick={() => handleOptionClick("/registration")}>
                  Signup
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
