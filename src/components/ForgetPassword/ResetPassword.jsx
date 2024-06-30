import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RestPassword() {
  const navigate = useNavigate();
  const validation = Yup.object({
    resetCode: Yup.string().matches(/^[0-9]{4,6}/,"Not Vaild")
    .required('Reset code is required')
  });
  const formik = useFormik({
    initialValues: {
        resetCode: "",
    },
    // validate:validate,
    validationSchema: validation,
    onSubmit: Verfiy,
  });


  const [isloading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setStatus] =useState(false)

  function Verfiy() {
    setIsLoading(true);
    let { data } = axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        formik.values
      )
      .then((data) => {
        navigate('/EcommerceProject/resetPassword')
        setIsLoading(false)
        // console.log(data.data.message)

  }).catch((error)=>{
    // console.log(error)
    setIsLoading(false)
   

  });
  
      
  }
  return (
    <div className="my-7  md:w-3/4 mx-auto md:p-6 ">
      <h2 className="py-5  text-3xl  "> Reset Code Send In Email </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="text"
            id="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="22579"
            name="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.resetCode}
            </p>
          )}
        </div>
        <div className="mb-6 ">
          <button
            disabled={isloading}
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ms-auto  block"
          >
            {isloading ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i>
              </span>
            ) : (
              <span> Verfiy</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RestPassword;
