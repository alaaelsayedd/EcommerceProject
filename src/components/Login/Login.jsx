import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

function Login() {
  const { setLogin } = useContext(authContext);
  const navigate = useNavigate();
  const validation = Yup.object({
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter vaild  Email Please")
      .required("Email is Required"),
    password: Yup.string()
      .matches(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
      )
      .required("password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate:validate,
    validationSchema: validation,
    onSubmit: Login,
  });
  const path = location.pathname;

  //   function validate(values){
  //     let errors={};

  //     if(values.email =='')
  //         {
  //             errors.email="Email is Required"
  //         }
  //     else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))
  //         {
  //             errors.email ="Enter vaild  Email Please"
  //         }
  //     if(values.password =='')
  //         {
  //             errors.pass="password is Required"
  //         }
  //     else if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password))
  //         {
  //             errors.pass ="password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
  //         }

  //         return errors;

  //   }
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setMessage] = useState("");
  function Login() {
    setMessage("");
    setIsLoading(true);
    let { data } = axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values)
      .then((data) => {
        // console.log(data);
        setLogin(true);
        setIsLoading(false);
        localStorage.setItem("token", data.data.token);
        if (path != "/login") {
          navigate(path);
        } else {
          navigate("/");
        }

        setMessage("");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setIsLoading(false);
      });
  }
  return (
    <div className="my-5  md:w-3/4 mx-auto md:p-5 ">
      <h2 className="py-5  text-3xl  ">Login </h2>
      <form onSubmit={formik.handleSubmit}>
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
          />
          {formik.errors.password && formik.touched.password && (
            <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        {errorMessage && (
          <p className="bg-red-400 text-white rounded text-sm  py-2 px-2 my-2">
            {errorMessage}
          </p>
        )}
          <Link className="my-2  text-red-600" to={'/forgetpassword'}>Forget Password ? </Link>

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
              <span> Login</span>
            )}
          </button>
        
        </div>
      </form>
    </div>
  );
}

export default Login;
