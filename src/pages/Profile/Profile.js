import React, { useState } from 'react';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import LoginScreen from '../../components/LoginScreen/LoginScreen';

function Profile() {
  const [screen, setScreen] = useState('auth');

  if (screen === 'login') {
    return (
      <LoginScreen
        focusKey="PAGE-PROFILE-CONTENT"
        onBack={() => setScreen('auth')}
        onSubmit={(value) => console.log('Submit login', value)}
        onSmsLogin={(value) => console.log('SMS login', value)}
        onForgotPassword={() => console.log('Forgot password')}
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
