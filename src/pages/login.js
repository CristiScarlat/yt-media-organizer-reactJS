import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Ctx } from "../context/store";
import { LOGIN_TYPE } from "../utils/constants";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase/fb";

const LoginPage = () => {

    const { darkMode, setUser } = useContext(Ctx);
    const [signup, setSignup] = useState(false);

    const handleSignup = (loginType, loginData) => {
        if (loginType === LOGIN_TYPE.emailPsw) {
            console.log("signup")
            createUserWithEmailAndPassword(auth, loginData.email, loginData.psw)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log("login", user)
                    setUser(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({ errorCode, errorMessage })
                    // ..
                });
        }
    }

    const handleLogin = (loginType, loginData) => {
        if (loginType === LOGIN_TYPE.emailPsw) {
            signInWithEmailAndPassword(auth, loginData.email, loginData.psw)
                .then((userCredential) => {
                    console.log(userCredential)
                    // Signed in 
                    const user = userCredential.user;
                    setUser(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({ errorCode, errorMessage })
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[1].value;
        const psw = e.target[2].value;
        if (signup) {
            handleSignup(LOGIN_TYPE.emailPsw, { email, psw });
        }
        else {
            handleLogin(LOGIN_TYPE.emailPsw, { email, psw });
        }
    }

    return (
        <main className={`${darkMode && "dark-mode"} mt-lg-5 d-flex`}>
            <Form style={{ maxWidth: "40rem", margin: "auto" }} onSubmit={handleSubmit}>
                <Form.Check
                    className="mb-3"
                    type="switch"
                    id="signup/signin"
                    label="You don't have an accout yet? Sign up"
                    value={signup}
                    onChange={() => setSignup(!signup)}
                />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    {signup ? "Sign up" : "Login"}
                </Button>
            </Form>
        </main>
    )
}

export default LoginPage;