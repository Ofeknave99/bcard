import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { adduser } from "../services/UserSevices";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackServicw";

interface User {
  id?: number;
  name: string;
  lastName:string;
  password: string;
  email: string;
  phone: number;
  image: string;
  state?: string;
  city: string;
  housenumber: number;
  country: string;
  street: string;
  zip?: number;
  role?: string;
}

interface RegisterProps {
  setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
  const navigate = useNavigate();

  const onSubmit = (values: User) => {
    navigate("/home");
    adduser({ ...values, role: formik.values.role ? "business" : "regular" })
      .then((res) => {
        successMsg(`Registration successful ${values.email}`);
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: res.data.email,
            role: res.data.role,
            userId: res.data.id,
          })
        );
        setUserInfo(
          JSON.parse(sessionStorage.getItem("userInfo") as string)
        );
      })
      .catch((err) => {
        errorMsg("Failed to register");
        console.error("Failed to add user:", err);
      });
  };

  const formik = useFormik<User>({
    initialValues: {
      name: "",
       lastName:"",
      password: "",
      email: "",
      role: "",
      phone: 0,
      image: "",
      city: "",
      housenumber: 0,
      country: "",
      street: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      lastname: yup.string().required(),
      password: yup.string().required().min(8),
      email: yup.string().required().email(),
      city: yup.string().required(),
      housenumber:yup.number().required(),
      phone:yup.number().required().min(10),
       country: yup.string().required(),
       street: yup.string().required(),
      
    }),
    onSubmit,
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
           last Name:
          </label>
          <input
            type="text"
            id=" lastName"
           name="lastName"
            className="form-control"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-danger">{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formik.values.phone || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control"
            value={formik.values.image || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-control"
            value={formik.values.state || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formik.values.city || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="housenumber" className="form-label">
            House Number
          </label>
          <input
            type="number"
            id="housenumber"
            name="housenumber"
            className="form-control"
            value={formik.values.housenumber || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="form-control"
            value={formik.values.country || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            className="form-control"
            value={formik.values.street || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">
            Zip
          </label>
          <input
            type="number"
            id="zip"
            name="zip"
            className="form-control"
            value={formik.values.zip || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="isBusiness"
            name="role"
            className="form-check-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="form-check-label" htmlFor="isBusiness">
            isBusiness
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;