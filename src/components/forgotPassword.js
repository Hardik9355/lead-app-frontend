import React, { useState } from "react";
import {
  FormContainer,
  FormDetails,
  SubmitButton,
  CreateLeadContainer,
} from "./CreateLead";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a1f36;
`;
const ToggleLink = styled.p`
  margin-top: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
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

const Input = styled.input`
  width: 80%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 16px;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        username: data.username,
        password: data.password,
      };
      await API.put("/updatepassword", body);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  return (
    <Layout>
      <Container>
        <FormWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>Forgot Password</Title>

            <CreateLeadContainer>
              <FormContainer>
                <FormDetails>
                  <Input
                    type="text"
                    placeholder="UserName"
                    {...register("username", { required: true })}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...register("password", { required: true })}
                  />

                  <ButtonGroup>
                    <SubmitButton type="submit">Submit</SubmitButton>
                  </ButtonGroup>
                </FormDetails>
              </FormContainer>
            </CreateLeadContainer>
            <ToggleLink onClick={() => navigate("/login")}> Login</ToggleLink>
          </Form>
        </FormWrapper>
      </Container>
    </Layout>
  );
};
export default ForgotPassword;
