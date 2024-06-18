import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

function Checkout() {
  const [isloading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [errorMessage, setMessage] = useState("");
  const navigate = useNavigate();
  const validation = Yup.object({
    details: Yup.string()
      .min(3, "Enter vaild details more than 3 char")
      .max(20, "Enter vaild details less than 20 char")
      .required(" details is required"),
    city: Yup.string()
      .min(3, "Enter vaild city more than 3 char")
      .max(20, "Enter vaild city less than 20 char")
      .required("city is required"),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "phone number is wrong")
      .required("Phone is Required"),
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: register,
  });
  function register() {
    setIsLoading(true);
    setMessage("");
    let { data } = axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + id,
        {
          shippingAddress: formik.values,
        },

        {
          params: {
            url: "http://localhost:5173",
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        window.open(data.data.session.url, "_self");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  return (
    <div className="my-5  md:w-3/4 mx-auto">
      <h2 className="py-5  text-3xl  ">Check Out </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details
          </label>
          <input
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" enter details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.details}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details
          </label>
          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" enter city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.city}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="+201022258794"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.phone}
            </p>
          )}
        </div>
        {errorMessage && (
          <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-2">
            {errorMessage}
          </p>
        )}
        <div className="mb-6 ">
          <button
            type="submit"
            className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ms-auto  block"
            disabled={isloading}
          >
            {isloading ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i>
              </span>
            ) : (
              <span> CheckOUT </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
