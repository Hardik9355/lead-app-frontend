import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import API from "../api";
import Layout from "../components/Layout";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import HCaptcha from "react-hcaptcha";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a1f36;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Form = styled.form`
  background: #1a3d5d;
  padding: 60px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
`;

const Checkbox = styled.input`
  width: auto;
  margin-top: 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #218838;
  }
`;

const ToggleLink = styled.p`
  margin-top: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
`;
const hcaptchaSiteKey = "4bdad71e-18ca-45b0-a5d4-e1284decd28e";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hCaptchaToken, setHCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const onSubmitLogin = async (data) => {
    console.log(data);
    if (!hCaptchaToken) {
      setError("Please complete the hCaptcha.");
      return;
    }
    setLoading(true);
    try {
      const response = await API.post("/loginuser", { ...data, hCaptchaToken });
      console.log(response.status, "this is my status");
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data);
        window.location.href = "/dashboard"; // Example redirect
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitSignup = async (data) => {
    try {
      const response = await API.post("/createuser", data);

      if (response.data.code === 200) {
        // Adjust based on your API response
        setIsLogin(true);
        navigate("/login");

        // Switch to login form after successful signup
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up"); // General error message
    }
  };

  const handleHCaptchaVerify = (token) => {
    console.log(token, "qjoisjqo");
    setHCaptchaToken(token);
  };

  return (
    <Layout>
      <Container>
        <FormWrapper>
          <Form
            onSubmit={handleSubmit(isLogin ? onSubmitLogin : onSubmitSignup)}
          >
            <Title>{isLogin ? "Sign in" : "Sign up"}</Title>
            {!isLogin && (
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: !isLogin })}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                Remember me
              </CheckboxLabel>
            </FormGroup>
            <FormGroup>
            console.log(hcaptchaSiteKey)
              <HCaptcha
                sitekey="4bdad71e-18ca-45b0-a5d4-e1284decd28e"
                onVerify={handleHCaptchaVerify}
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">
              {loading ? (
                <AiOutlineLoading style={{ marginRight: "8px" }} />
              ) : isLogin ? (
                "Login"
              ) : (
                "Signup"
              )}

            </Button>
            <ToggleLink onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Log in"}
            </ToggleLink>
            <ToggleLink onClick={() => navigate("/forgot-password")}>
              {" "}
              Forgot Password
            </ToggleLink>
          </Form>
        </FormWrapper>
      </Container>
    </Layout>
  );
};

export default Login;
