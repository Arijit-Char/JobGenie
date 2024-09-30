import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#0B0C10",
    },
    primary: {
      main: "#66FCF1",
    },
    secondary: {
      main: "#45A29E",
    },
    text: {
      primary: "#C5C6C7",
      secondary: "#C5C6C7",
    },
  },
  typography: {
    h5: {
      color: "#C5C6C7",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#66FCF1",
          },
          "&:hover fieldset": {
            borderColor: "#45A29E",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#66FCF1",
          },
        },
      },
    },
  },
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.login);

  // State to manage password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Form validation: check if email and password are filled
    if (!email || !password) {
      toast.error("Please enter valid credentials.", { position: "bottom-center" });
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", { position: "bottom-center" });
      return;
    }
    // Dispatch login action if form is valid
    dispatch(login(email, password));
  };

  React.useEffect(() => {
    if (message) {
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      const item = {
        token: message,
        expires: expirationTime,
      };

      localStorage.setItem("token", JSON.stringify(item));
      toast.success(message, { position: "bottom-center" });
      navigate("/");
    } else if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      console.error("Error logging in:", error);
    }
  }, [error, message, dispatch, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1F2833",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { color: "#C5C6C7" } }}
              InputProps={{
                style: { color: "#C5C6C7" },
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: "#C5C6C7" } }}
              InputProps={{
                style: { color: "#C5C6C7" },
                shrink: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#45A29E" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#45A29E", color: "#0B0C10" }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/registration" variant="body2" sx={{ color: "#66FCF1" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
