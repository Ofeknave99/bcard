import React, { useState } from "react";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { addCard } from "../services/CardService";
import { successMsg } from "../services/feedbackServicw";
import MyCard from "./MyCard";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);

  const formik = useFormik({
    initialValues: {
      id: undefined,
      title: "",
      sutitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: "",
      state: "",
      country: "",
      city: "",
      street: "",
      Hosenumber: undefined,
      zip: undefined,
      
     
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      sutitle: yup.string().required("Subtitle is required"),
      description: yup.string().required("Description is required"),
      phone: yup.string().required("Phone is required"),
      email: yup.string().required("Email is required"),
      web: yup.string(),
      image: yup.string().required("Image is required"),
      state: yup.string(),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      street: yup.string().required("Street is required"),
      Hosenumber: yup.number().required("House Number is required"),
      zip: yup.number().required("Zip is required"),
    }),
  onSubmit: (values: Card, { resetForm }) => {
  addCard(values)
    .then((res) => {
      const newCard = res.data;
      successMsg("Card added successfully!");
      resetForm();
      navigate(-1);
      
    })
    .catch((err) => console.log(err));
},



  });

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Add New Card</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="sutitle" className="form-label">
              Subtitle
            </label>
            <input
              type="text"
              id="sutitle"
              name="sutitle"
              className="form-control"
              value={formik.values.sutitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.sutitle && formik.errors.sutitle && (
              <div className="text-danger">{formik.errors.sutitle}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
            placeholder="Put the email you used to connect to the website so you can edit your card"
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="web" className="form-label">
              Website
            </label>
            <input
              type="text"
              id="web"
              name="web"
              className="form-control"
              value={formik.values.web}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.web && formik.errors.web && (
              <div className="text-danger">{formik.errors.web}</div>
            )}
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
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
               placeholder="You can put a link to a map of your business location"
              type="text"
              id="state"
              name="state"
              className="form-control"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <div className="text-danger">{formik.errors.state}</div>
            )}
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
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.country && formik.errors.country && (
              <div className="text-danger">{formik.errors.country}</div>
            )}
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
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-danger">{formik.errors.city}</div>
            )}
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
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.street && formik.errors.street && (
              <div className="text-danger">{formik.errors.street}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Hosenumber" className="form-label">
              House Number
            </label>
            <input
              type="number"
              id="Hosenumber"
              name="Hosenumber"
              className="form-control"
              value={formik.values.Hosenumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Hosenumber && formik.errors.Hosenumber && (
              <div className="text-danger">{formik.errors.Hosenumber}</div>
            )}
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
            {formik.touched.zip && formik.errors.zip && (
              <div className="text-danger">{formik.errors.zip}</div>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary">
            Add Card
          </button>
        </form>
       
      </div>
      
    </>
  );
};

export default AddCard;