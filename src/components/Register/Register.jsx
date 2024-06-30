import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  const [isloading, setIsLoading] = useState(false);
  const[errorMessage,setMessage]=useState("");
  const navigate = useNavigate();
  const validation = Yup.object({
    name: Yup.string()
      .min(3, "Enter vaild name more than 3 char")
      .max(20, "Enter vaild name less than 20 char")
      .required("name is required"),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter vaild  Email Please")
      .required("Email is Required"),
    password: Yup.string()
      .matches(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
      )
      .required("password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "not matched")
      .required("Repaete password is Required"),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "phone number is wrong")
      .required("Phone is Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate:validate,
    validationSchema: validation,
    onSubmit: register,
  });
   function register() {
    // console.log(formik.values);
    setIsLoading(true);
    setMessage("");
    let { data } =  axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formik.values)
      .then((data)=>{
        // console.log(data);
        setIsLoading(false);
        navigate('/EcommerceProject/login');
        setMessage("");
      }).catch(   (error)=> {
        // console.log(  error.response.data.message);
        setMessage( error.response.data.message)
        setIsLoading(false);
      });
      
  }
  //   function validate(values){
  //     let errors={};
  // if(values.name =='')
  //     {
  //         errors.name="name is required"
  //     }
  // else if(values.name.length<3)
  //     {
  //         errors.name="Enter vaild name more than 3 char"
  //     }
  // else if(values.name.length>20)
  //     {
  //         errors.name="Enter vaild name less than 20 char"
  //     }
  // if(values.email =='')
  //     {
  //         errors.email="Email is Required"
  //     }
  // else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))
  //     {
  //         errors.email ="Enter vaild  Email Please"
  //     }
  //     if(values.password =='')
  //         {
  //             errors.pass="password is Required"
  //         }
  //     else if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password))
  //         {
  //             errors.pass ="password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
  //         }
  //     if(values.rePassword =='')
  //         {
  //             errors.rePass="Repaete password is Required"
  //         }
  //     else if(values.rePassword!=values.password)
  //         {
  //             errors.rePass ="not matched"
  //         }
  //     if(values.phone =='')
  //         {
  //             errors.phone="Phone is Required"
  //         }
  //     else if(!/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/.test(values.phone))
  //         {
  //             errors.phone ="phone number is wrong"
  //         }

  //         return errors;

  //   }
  return (
    <div className="my-5  md:w-3/4 mx-auto">
      <h2 className="py-5  text-3xl  ">Register Now </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" EX: john"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="john.doe@company.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="•••••••••"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="•••••••••"
            name="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.rePassword}
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
        {errorMessage &&<p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-2">
              {errorMessage}
            </p>}
        <div className="mb-6 ">
          <button
            type="submit"
            className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ms-auto  block"
            disabled={isloading}
          >
            {isloading? <span><i className="fas fa-spinner fa-spin"></i></span>: <span> Register</span> }
          
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
