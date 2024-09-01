import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import API from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0e2a38;
`;

const Form = styled.form`
  background: #132f3f;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
`;

const Label = styled.label`
  color: white;
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: #1b3a4b;
  color: white;
`;

const ImageUploadContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const ImageUpload = styled.div`
  border: 2px dashed #4d4d4d;
  border-radius: 4px;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  cursor: pointer;
  overflow: hidden;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #333;
  color: white;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;
`;

const EditLead = ({ lead, onCancel, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: lead || {
      name: "",
      mobile_number: "",
      email: "",
      product: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        id: lead._id,
        mobile_number: data.mobile_number,
        name: data.name,
        email: data.email,
        product: data.product,
      };

      await API.put("/updatelead", body);

      reset();
      onSave();
      onCancel();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Edit Lead Details</Title>

        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />

        <Label>Mobile Number</Label>
        <Input
          type="number"
          placeholder="Mobile Number"
          {...register("mobile_number", { required: true })}
        />
        <Label>Email</Label>

        <Input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Label>Peoduct</Label>

        <Input
          type="text"
          placeholder="Product"
          {...register("product", { required: true })}
        />

        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">Save</SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default EditLead;
