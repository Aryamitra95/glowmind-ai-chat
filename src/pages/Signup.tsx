
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Eye, EyeOff, Mail, Lock, User, Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { account } from "@/lib/appwrite";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
  };

  const { strength, checks } = getPasswordStrength(formData.password);
  const strengthPercent = (strength / 5) * 100;
  const strengthColor = strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : 'bg-green-500';
  const strengthText = strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (strength < 3) {
      newErrors.password = 'Password is too weak. Please meet more requirements.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Appwrite signup
      const user = await account.create(
        "unique()",
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`
      );
      console.log('Appwrite user created:', user);
      // Optionally, log the user in immediately after signup
      await account.createSession(formData.email, formData.password);
      setSuccess('Signup successful! Redirecting...');
      // Navigate to chat page on successful signup
      setTimeout(() => navigate('/chat'), 1000);
    } catch (error: any) {
      console.error('Signup error (full object):', error);
      setErrors({ general: error?.message || error?.response?.message || 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth process
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Google signup initiated');
      navigate('/chat');
    } catch (error) {
      console.error('Google signup error:', error);
      setErrors({ general: 'Google signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B4FF57] via-purple-200 to-[#FF6EC7] flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/20 border-white/30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#B4FF57] to-[#FF6EC7] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">G</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Join GlowMind</CardTitle>
          <CardDescription className="text-gray-700">
            Create your account to start your mental health journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <Alert className="bg-green-50/80 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}
          {errors.general && (
            <Alert className="bg-red-50/80 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`pl-10 backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 ${
                      errors.firstName ? 'border-red-300 focus:border-red-500' : ''
                    }`}
                    aria-label="First name"
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                </div>
                {errors.firstName && (
                  <span id="firstName-error" className="text-sm text-red-600" role="alert">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-900 font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 ${
                    errors.lastName ? 'border-red-300 focus:border-red-500' : ''
                  }`}
                  aria-label="Last name"
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && (
                  <span id="lastName-error" className="text-sm text-red-600" role="alert">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 ${
                    errors.email ? 'border-red-300 focus:border-red-500' : ''
                  }`}
                  aria-label="Email address"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <span id="email-error" className="text-sm text-red-600" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 pr-10 backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 ${
                    errors.password ? 'border-red-300 focus:border-red-500' : ''
                  }`}
                  aria-label="Password"
                  aria-describedby="password-requirements"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Progress value={strengthPercent} className="flex-1 h-2" />
                    <span className={`text-sm font-medium ${strengthColor.replace('bg-', 'text-')}`}>
                      {strengthText}
                    </span>
                  </div>
                  <div id="password-requirements" className="text-xs space-y-1">
                    <div className={`flex items-center gap-2 ${checks.length ? 'text-green-600' : 'text-gray-500'}`}>
                      {checks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {checks.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {checks.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${checks.number ? 'text-green-600' : 'text-gray-500'}`}>
                      {checks.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      One number
                    </div>
                    <div className={`flex items-center gap-2 ${checks.special ? 'text-green-600' : 'text-gray-500'}`}>
                      {checks.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      One special character
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <span className="text-sm text-red-600" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pl-10 pr-10 backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 ${
                    errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''
                  }`}
                  aria-label="Confirm password"
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirmPassword-error" className="text-sm text-red-600" role="alert">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/20 px-2 text-gray-700 backdrop-blur-sm rounded">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full backdrop-blur-sm bg-white/50 border-white/50 hover:bg-white/70 text-gray-900 py-3"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="text-center text-sm text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gray-900 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
