
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import ForgotPassword from '@/components/auth/ForgotPassword';
import VerifyOtp from '@/components/auth/VerifyOtp';
import ResetPassword from '@/components/auth/ResetPassword';
import Profile from '@/components/auth/Profile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/layout/layout';
import AboutUs from '@/pages/main/AboutUs';
import ContactUs from '@/pages/main/ContactUs';
import Home from '@/pages/main/Home';
import Services from '@/pages/main/Services';
import NotFound from '@/pages/shared/NotFound';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
