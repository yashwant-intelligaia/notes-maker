import { useState } from 'react';
import SocialButton from './SocialButton';
function SocialAuth() {
    const handleSocialLogin = (user) => {
        console.log(user)
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }
    return <SocialButton
        provider='google'
        appId='notes-maker-298608'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
    >
        Login with Google
  </SocialButton>
}

export default SocialAuth;