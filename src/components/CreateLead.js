import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import API from "../api";
import { useNavigate } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0e2a38;
`;

export const Form = styled.form`
  background: #0e2a38;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  align-self: flex-start;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: #1b3a4b;
  color: white;
  &::placeholder {
    color: white;
  }
`;
export const CustomSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 2px solid #1b3a4b;
  border-radius: 4px;
  background-color: #1b3a4b;
  color: white;
  font-size: 16px;
  cursor: pointer;
  appearance: none;

  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 12px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Shadow on focus */
  }

  option {
    background-color: #1b3a4b;
    color: white;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid white;
  color: white;
`;

export const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;
  margin-left: 10px;
`;

export const CreateLeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 700px;
`;

const ImageUploadWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const FormDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CreateLead = ({ lead }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: lead || {
      name: "",
      mobile_number: "",
      email: "",
      product: "",
    },
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // formData.append('mobile_number', data.mobile_number);
      // formData.append('name', data.name);
      // formData.append('email', data.email);
      // formData.append('product', data.product);

      const body = {
        mobile_number: data.mobile_number,
        name: data.name,
        email: data.email,
        product: data.product,
      };

      if (lead) {
        await API.put(`/leads/${lead._id}`, body);
      } else {
        await API.post("/createlead", body);
        navigate("/dashboard");
      }

      reset();
      setPreview(null);
    } catch (error) {
      console.error("Error submitting lead data:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/dashboard");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CreateLeadContainer>
          <Title>Add a new lead</Title>
          <FormContainer>
            <FormDetails>
              {/* <Label>Title</Label> */}
              <Input
                type="number"
                placeholder="Mobile Number"
                {...register("mobile_number", { required: true })}
              />
              {/* <Label>Publishing Year</Label> */}
              <Input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <Input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <Input
                type="text"
                placeholder="Product"
                {...register("product", { required: true })}
              />

              <ButtonGroup>
                <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">Submit</SubmitButton>
              </ButtonGroup>
            </FormDetails>
          </FormContainer>
        </CreateLeadContainer>
      </Form>
    </Container>
  );
};

export default CreateLead;
