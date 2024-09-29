import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";

export default function Header() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.logout);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = <button>It's btn</button>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginTop: "1rem" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            JobGenie
          </Typography>
          <IconButton
            className="signup-button"
            size="small"
            color="inherit"
            variant="contained"
            onClick={() => navigate("/")}
            style={{ marginLeft: "5rem", fontSize: "1rem" }}
            disabled={!localStorage.getItem("token")}
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {localStorage.getItem("token") ? (
              <>
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
              </>
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
                  onClick={() => navigate("/registration")}
                  size="small"
                  color="inherit"
                >
                  Signup
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
