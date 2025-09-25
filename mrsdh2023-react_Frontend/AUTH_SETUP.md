# Authentication Setup Guide

This document explains how to set up and use the authentication system implemented based on your Postman collection.

## Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/

# Example for production:
# VITE_API_BASE_URL=https://your-api-domain.com/
```

## Available Authentication Features

### 1. User Registration
- **Route**: `/sign-up`
- **Component**: `SignUp.jsx`
- **Hook**: `useSignUp()`
- **Endpoint**: `POST /account/register/`
- **Fields**: name, email, phone, password, confirm_password

### 2. User Login
- **Route**: `/sign-in`
- **Component**: `SignIn.jsx`
- **Hook**: `useSignIn()`
- **Endpoint**: `POST /account/login/`
- **Fields**: email, password

### 3. Forgot Password
- **Route**: `/forgot-password`
- **Component**: `ForgotPassword.jsx`
- **Hook**: `useForgotPassword()`
- **Endpoint**: `POST /account/reset-password/request-otp/`
- **Fields**: email

### 4. Reset Password
- **Route**: `/reset-password`
- **Component**: `ResetPassword.jsx`
- **Hook**: `useResetPassword()`
- **Endpoint**: `POST /account/reset-password/set-new-password/`
- **Fields**: email, otp, new_password, confirm_password

### 5. User Profile
- **Route**: `/profile` (Protected)
- **Component**: `Profile.jsx`
- **Hooks**: `useProfile()`, `useUpdateProfile()`, `useChangePassword()`
- **Endpoints**: 
  - `GET /account/profile/`
  - `PATCH /account/profile/`
  - `POST /account/change-password/`

### 6. Logout
- **Hook**: `useLogout()`
- **Endpoint**: `POST /account/logout/`

## Authentication Context

The app uses `AuthContext` for global authentication state management:

```jsx
import { useAuth } from '@/contexts/AuthContext';

const { user, token, isAuthenticated, login, logout } = useAuth();
```

## Protected Routes

Use the `ProtectedRoute` component to protect routes that require authentication:

```jsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

## Form Validation

All forms use Zod schemas for validation:
- `signInSchema`
- `signUpSchema`
- `forgotPasswordSchema`
- `verifyOtpSchema`
- `resetPasswordSchema`
- `changePasswordSchema`

## API Integration

The authentication system is configured to work with your Postman collection endpoints:

- **Base URL**: Configured via `VITE_API_BASE_URL`
- **Authentication**: Bearer token in Authorization header
- **Error Handling**: Automatic token expiration handling
- **Request/Response Interceptors**: Configured in `axios.config.js`

## Usage Examples

### Sign In
```jsx
import { useSignIn } from '@/hooks/auth.hook';

const { form, mutate, isPending } = useSignIn();

const onSubmit = (data) => {
  mutate(data);
};
```

### Check Authentication Status
```jsx
import { useAuth } from '@/contexts/AuthContext';

const { isAuthenticated, user } = useAuth();

if (isAuthenticated()) {
  console.log('User is logged in:', user);
}
```

### Logout
```jsx
import { useLogout } from '@/hooks/auth.hook';

const { mutate, isPending } = useLogout();

const handleLogout = () => {
  mutate();
};
```

## Error Handling

The system includes comprehensive error handling:
- Form validation errors
- API response errors
- Network errors
- Token expiration handling
- User-friendly error messages

## Security Features

- JWT token storage in localStorage
- Automatic token expiration handling
- Protected route access control
- Form validation and sanitization
- Secure password handling

## Dependencies

Make sure you have these packages installed:
- `@tanstack/react-query`
- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `react-hot-toast`
- `axios`

## Next Steps

1. Set up your `.env` file with the correct API base URL
2. Test the authentication flow with your backend
3. Customize the UI components as needed
4. Add any additional validation rules
5. Implement role-based access control if needed


