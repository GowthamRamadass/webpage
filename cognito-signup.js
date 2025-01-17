// AWS Cognito Sign-Up Process

// Include Required SDKs
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

// Step 1: Configure Cognito User Pool
const poolData = {
    UserPoolId: 'YOUR_USER_POOL_ID', // Replace with your User Pool ID
    ClientId: 'YOUR_CLIENT_ID',      // Replace with your App Client ID
};

const userPool = new CognitoUserPool(poolData);

// Step 2: Handle Sign-Up
export function handleSignupFormSubmission(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const attributeList = [];
    const dataEmail = {
        Name: 'email',
        Value: email,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            alert('Sign-up failed: ' + err.message);
            return;
        }
        console.log('User signed up:', result.user.getUsername());
        alert('Sign-up successful! Check your email for a confirmation link.');
    });
}

// Step 3: Handle Verification
export function handleVerificationFormSubmission(event) {
    event.preventDefault();

    const username = document.getElementById('usernameVerify').value;
    const code = document.getElementById('confirmationCode').value;

    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            alert('Verification failed: ' + err.message);
            return;
        }
        console.log('Verification successful:', result);
        alert('Account verified! You can now log in.');
    });
}
