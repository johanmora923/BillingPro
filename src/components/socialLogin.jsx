import React from 'react';
import { FaGoogle, FaTwitter, FaFacebook } from 'react-icons/fa';

export const SocialLogin = () => {
    const googleClientId = "YOUR_GOOGLE_CLIENT_ID";
    const twitterKey = "YOUR_TWITTER_KEY";
    const facebookAppId = "YOUR_FACEBOOK_APP_ID";

    const handleGoogleLogin = (response) => {
        console.log('Google login success:', response);
        // Aquí puedes enviar el token al backend para verificar
    };

    const handleTwitterLogin = (response) => {
        console.log('Twitter login success:', response);
        // Aquí puedes enviar el token al backend para verificar
    };

    const handleFacebookLogin = (response) => {
        console.log('Facebook login success:', response);
        // Aquí puedes enviar el token al backend para verificar
    };

    return (
        <div className="flex flex-col items-center space-x-4 mt-4">
            <div className='flex space-x-4 mb-5'>
                <GoogleLogin
                clientId={googleClientId}
                buttonText=""
                onSuccess={handleGoogleLogin}
                onFailure={(error) => console.error('Google login error:', error)}
                render={(renderProps) => (
                <FaGoogle
                    onClick={renderProps.onClick}
                    className="text-gray-400 hover:text-red-600 cursor-pointer text-lg"
                />
                )}
            />
                <TwitterLogin
                    loginUrl="YOUR_TWITTER_LOGIN_URL"
                    onFailure={(error) => console.error('Twitter login error:', error)}
                    onSuccess={handleTwitterLogin}
                    requestTokenUrl="YOUR_TWITTER_REQUEST_TOKEN_URL"
                    customHeaders={{ Authorization: `Bearer ${twitterKey}` }}
                    children={
                    <FaTwitter className="text-gray-400 hover:text-blue-500 cursor-pointer text-lg" />
                    }
                />
            </div>
            <div>
                <FacebookLogin
                appId={facebookAppId}
                fields="name,email,picture"
                callback={handleFacebookLogin}
                render={(renderProps) => (
                <FaFacebook
                    onClick={renderProps.onClick}
                    className="text-gray-400 hover:text-blue-700 cursor-pointer text-lg"
                />
            )}
                />
            </div>
        
        </div>
    );
};

export default SocialLogin;
