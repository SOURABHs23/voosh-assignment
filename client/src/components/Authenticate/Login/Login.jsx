// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LoginIcon from "@mui/icons-material/Login";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";



// const defaultTheme = createTheme();

// export default function Login({ handleLogin }) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");

//     try {
//       await handleLogin(email, password);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: "url(https://source.unsplash.com/random?city)",
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LoginIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="/recover" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link href="/register" variant="body2">
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }



// import React from "react";

// function Login({ handleLogin }) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");

//     try {
//       await handleLogin(email, password);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", width: "100%" }}>
//         <h1>Sign in</h1>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           required
//           style={{ padding: "10px", margin: "10px 0" }}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           style={{ padding: "10px", margin: "10px 0" }}
//         />
//         <button type="submit" style={{ padding: "10px", margin: "10px 0", backgroundColor: "blue", color: "white", border: "none" }}>
//           Sign In
//         </button>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <a href="/recover" style={{ color: "blue", textDecoration: "none" }}>Forgot password?</a>
//           <a href="/register" style={{ color: "blue", textDecoration: "none" }}>{"Don't have an account? Sign Up"}</a>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React from "react";
import { Button, TextField, Link, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define a theme for consistent styling
const theme = createTheme();

function Login({ handleLogin }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
