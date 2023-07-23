import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkUser } from "../services/UserSevices";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackServicw";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
     checkUser({
       name: "",
       lastName:"",
       password: values.password,
       email: values.email,
       phone: 0,
       image: "",
       city: "",
       housenumber: 0,
       country: "",
       street: ""
     })
        .then((res) => {
          if (res.data.length) {
            successMsg(`Login successful ${values.email}`);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                email: res.data[0].email,
                role: res.data[0].role,
                userId: res.data[0].id,
              })
            );
            setUserInfo(
              JSON.parse(sessionStorage.getItem("userInfo") as string)
            );
            navigate("/Home");
          } else {
            errorMsg("Wrong Email or Password");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
   
      <h3 className="display-3 mt-">LOGIN</h3>
      <div className="container col-md-3 mt-5 vh-100 r ">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button className="btn btn-success w-100 mt-3" type="submit">
            Login
          </button>
        </form>
        <div className=" mt-3">
          <p>
            Not a member? <br /> <Link to={"/Register"}>Register !</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
