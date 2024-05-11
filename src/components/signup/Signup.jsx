
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { TextField } from "formik-material-ui";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel } from "@mui/material";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation schema
  const phoneNoRegex = /^(\+\d{1,3}[- ]?)?\d{10,13}$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Name must only contain alphabetic characters")
      .required("Name is required"),

    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,"Invalid email format" )
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .matches(
        phoneNoRegex,
        "Phone number must be a valid international number"
      ),
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Username must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .test(
        "not-same-as-username",
        "Password cannot be the same as the username",
        function (value) {
          return this.parent.username !== value;
        }
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const navigate = useNavigate();

  return (
    <Box
      component={"div"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#bfdad6"}
      minHeight={"100vh"}
    >
      <Box width={"80%"}>
        <Box
          paddingY={"30px"}
          bgcolor={"#016b5e"}
          color={"white"}
          fontSize={"20px"}
          letterSpacing={"1px"}
        >
          Create new Account
        </Box>
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values, "values");
            setSubmitting(false);
            navigate("/");
            console.log("Navigating...");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form style={{ backgroundColor: "white", padding: "20px" }}>
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                gap={{ xs: "15px", sm: "15px", md: "20px", lg: "20px" }}
              >
                <Field
                  component={TextField}
                  name="name"
                  label="NAME"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#0B6770" },
                  }}
                  FormHelperTextProps={{
                    style: { color: "red" },
                  }}
                />
                <Field
                  component={TextField}
                  name="username"
                  label="USERNAME"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#0B6770" },
                  }}
                  FormHelperTextProps={{
                    style: { color: "red" },
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                gap={{ xs: "5px", sm: "5px", md: "30px", lg: "30px" }}
              >
                <Field
                  component={TextField}
                  name="email"
                  label="EMAIL"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#0B6770" },
                  }}
                  FormHelperTextProps={{
                    style: { color: "red" },
                  }}
                />
                <Field
                  component={TextField}
                  name="phone"
                  label="PHONE NO."
                  variant="standard"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#0B6770" },
                  }}
                  FormHelperTextProps={{
                    style: { color: "red" },
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                gap={{ xs: "10px", sm: "10px", md: "30px", lg: "30px" }}
              >
                <FormControl sx={{  width: {xs:"100%",lg:"50%"},marginBlock:{sm:"15px",lg:"20px"}}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password" sx={{ color: "#0B6770" }}>
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
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage className="error" name="password" component="div" sx={{ color: "red" }} />
                </FormControl>

                <FormControl sx={{ width:{xs:"100%",lg:"50%"},marginBlock:{sm:"20px",lg:"20px"}}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password" sx={{ color: "#0B6770" }}>
                    CONFIRM NEW PASSWORD
                  </InputLabel>
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <Input
                        {...field}
                        id="standard-adornment-confirm-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage className="error" name="confirmPassword" component="div" sx={{ color: "red" }} />
                </FormControl>
              </Box>
              <Box display={"flex"} justifyContent={"end"} mt={"30px"}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: "#016b5e", padding: "5px 60px" }}
                >
                  SIGN UP
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Signup;
