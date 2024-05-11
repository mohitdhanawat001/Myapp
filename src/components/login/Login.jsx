import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Input, InputLabel } from "@mui/material";
import { useFormControl } from "@mui/material/FormControl";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Username must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });


  return (
    <Box
      component={"div"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#bfdad6"}
      height={"100vh"}
    >
      <Box width={"80%"}>
        <Box bgcolor={"#016b5e"} color={"white"} py={"10px"}>
          <p
            style={{
              fontWeight: "500",
              letterSpacing: "1px",
              fontSize: "20px",
            }}
          >
            Login
          </p>
          <p
            style={{
              fontSize: "18px",
              marginTop: "-10px",
              letterSpacing: "1px",
            }}
          >
            {" "}
            Sign in to continue
          </p>
        </Box>
        <Box width={"100%"} bgcolor={"white"} py={"20px"} pb={"30px"}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box>
                  <Field
                    component={TextField}
                    name="username"
                    label="USERNAME"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{
                      style: { color: "#0B6770" },
                    }}
                    FormHelperTextProps={{
                      style: { color: "red" }, 
                    }}
                  />
                </Box>
        
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                  <InputLabel
                    htmlFor="standard-adornment-password"
                    sx={{ color: "#0B6770" }}
                  >
                    NEW PASSWORD
                  </InputLabel>
                  <Field name="password">
                    {({ field, meta }) => (
                      <Input
                        {...field}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    className="error"
                    name="password"
                    component="div"
                    sx={{ color: "red" }}
                  />
                </FormControl>

                {/* </Box> */}
                <Box display={"flex"} justifyContent={"center"} mt={"30px"}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: "#016b5e", padding: "5px 60px" }}
                  >
                    LOGIN
                  </Button>
                </Box>

                <p>
                  Don't have an account? <a href="signup">Sign Up</a>
                </p>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
