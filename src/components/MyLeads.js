import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../api";
import EditLead from "./EditLead"; // Import EditLead component
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FaPlus, FaSignOutAlt } from "react-icons/fa"; // Import icons for add and logout
import { Input, CustomSelect } from "./CreateLead";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0d3b66;
  min-height: 100vh;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
  margin-bottom: 20px;
  align-items: center; /* Center align items vertically */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 400; /* Regular weight */
`;

const AddLeadsButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #aaa; /* Lighter color on hover */
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #aaa; /* Lighter color on hover */
  }
`;

const LeadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
`;

const LeadCard = styled.div`
  background-color: #005f73;
  border-radius: 10px;
  text-align: left;
  overflow: hidden;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LeadTitle = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  gap: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const EditButton = styled.button`
  background-color: #28a745; /* Green color */
  border: none;

  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;
const DeleteButton = styled.button`
  background-color: #ff0000; /* Green color */
  border: none;

  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8b0000; /* Darker green on hover */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetchLeads();
  }, [searchText, selectedOption]);

  const fetchLeads = async () => {
    try {
      const { data } = await API.get(
        `/getlead?name=${searchText}&sortBy=${selectedOption}`
      );
      if (data) {
        setLeads(data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    }
  };

  const handleEditClick = (lead) => {
    setEditingLead(lead);
  };
  const handleDeleteClick = async (lead) => {
    await API.delete(`/deletelead/${lead._id}`);
    handleSaveEdit();
  };

  const handleCancelEdit = () => {
    setEditingLead(null);
  };

  const handleSaveEdit = () => {
    fetchLeads();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const options = [
    { value: "name", label: "Sort Name By a-z" },
    { value: "", label: "Clear Sort" },
  ];
  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>Add New Lead</Title>
          <AddLeadsButton onClick={() => navigate("/add-leads")}>
            +
          </AddLeadsButton>
        </TitleContainer>
        <LogoutButton onClick={handleLogout}>
          Logout <FaSignOutAlt style={{ marginLeft: "5px" }} />
        </LogoutButton>
      </Header>
      <ButtonWrapper>
        <div>
          <Input
            type="text"
            placeholder="Search By Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>        <CustomSelect
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Sort</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </CustomSelect>
        </div>

      </ButtonWrapper>

      {editingLead ? (
        <EditLead
          lead={editingLead}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      ) : (
        <>
          <LeadsGrid>
            {leads.map((lead) => (
              <LeadCard key={lead._id}>
                <LeadTitle>Name:{lead.name}</LeadTitle>
                <LeadTitle>Number:{lead.mobile_number}</LeadTitle>
                <LeadTitle>Email:{lead.email}</LeadTitle>
                <LeadTitle>Product:{lead.product}</LeadTitle>

          
                <ButtonWrapper>
                  {" "}
                  <EditButton onClick={() => handleEditClick(lead)}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteClick(lead)}>
                    Delete
                  </DeleteButton>
                </ButtonWrapper>
              </LeadCard>
            ))}
          </LeadsGrid>
        </>
      )}
    </Container>
  );
};

export default MyLeads;
