import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from './FormInput'; 
import Button from './Button'; 

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', values.username);
      navigate('/dashboard', { state: { userId: response.data.userId } });
    } catch (error) {
      console.error(error.response?.data.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormInput label="Username" name="username" />
              <FormInput label="Password" name="password" type="password" />
              <Button type="submit" className="bg-blue-500 text-white" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <Link to="/welcome" className="text-blue-500 hover:underline">
            Return to Welcome Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
