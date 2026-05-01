import React, { useState } from 'react';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import LoginScreen from '../../components/LoginScreen/LoginScreen';
import SmsVerificationScreen from '../../components/SmsVerificationScreen/SmsVerificationScreen';
import CreatePasswordScreen from '../../components/CreatePasswordScreen/CreatePasswordScreen';

function Profile() {
  const [screen, setScreen] = useState('auth');

  if (screen === 'sms') {
    return (
      <SmsVerificationScreen
        focusKey="PAGE-PROFILE-CONTENT"
        onBack={() => setScreen('login')}
        onResend={() => console.log('Resend SMS code')}
      />
    );
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        focusKey="PAGE-PROFILE-CONTENT"
        onBack={() => setScreen('auth')}
        onSubmit={() => setScreen('password')}
        onSmsLogin={() => setScreen('sms')}
        onForgotPassword={() => console.log('Forgot password')}
      />
    );
  }

  if (screen === 'password') {
    return (
      <CreatePasswordScreen
        focusKey="PAGE-PROFILE-CONTENT"
        onBack={() => setScreen('login')}
        onConfirm={(value) => console.log('Confirm password', value)}
      />
    );
  }

  return (
    <AuthScreen
      focusKey="PAGE-PROFILE-CONTENT"
      onTraditionalLogin={() => setScreen('login')}
      onAppLogin={() => console.log('App login selected')}
      onGoogleLogin={() => console.log('Google login selected')}
    />
  );
}

export default Profile;
