import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import Button from './Button'; 

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false); // Track if registration is successful
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, values);
      // If successful, set the state to true to show the success message
      setIsRegistered(true);
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle errors (e.g., display error messages)
        setErrors({ email: error.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {/* Conditionally render the form or the success message */}
        {!isRegistered ? (
          <Formik
            initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string().required('First Name is required'),
              lastName: Yup.string().required('Last Name is required'),
              username: Yup.string().required('Username is required'),
              email: Yup.string().email('Invalid email address').required('Email is required'),
              password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <Field name="firstName" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <Field name="lastName" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <Field name="username" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field name="email" type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field name="password" type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <Field name="confirmPassword" type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="text-center">
            <p className="text-green-600 text-lg font-semibold">Registration is successful!</p>
            <Button
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </div>
        )}

        {/* Link button to return to welcome page */}
        <div className="text-center mt-4">
          <Link to="/welcome" className="text-blue-500 hover:underline">
            Return to Welcome Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
