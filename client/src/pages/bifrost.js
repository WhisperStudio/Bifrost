// bifrost.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for an elegant pop-up effect
const popUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Floating button in the bottom right corner
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0056b3;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

// Ticket panel that pops up above the button
const TicketPanel = styled.div`
  position: fixed;
  bottom: 100px; /* Positioned above the button */
  right: 20px;
  width: 400px;
  max-width: 90%;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  animation: ${popUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transform-origin: bottom right;
  z-index: 1200;
`;

// Header with gradient, fancy design, and "BIFROST" title
const PanelHeader = styled.div`
  background: linear-gradient(135deg, #0056b3, #007bff);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 1.8rem;
  letter-spacing: 2px;
`;

// Close button in the header corner
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
`;

// Panel body with light background
const PanelBody = styled.div`
  padding: 20px;
  background: #f9f9f9;
`;

// Shared styling for form fields
const FormField = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px; /* Extra right-side padding */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px; /* Extra right-side padding */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px; /* Extra right-side padding */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const NextButton = styled(SubmitButton)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

// Styled unordered list for game support links
const GameLinks = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
`;

const GameLinkItem = styled.li`
  margin-bottom: 5px;
`;

const LinkText = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const Bifrost = () => {
  // Step 1: Choose category; Step 2: Complete the form
  const [step, setStep] = useState(1);
  const [ticket, setTicket] = useState({
    category: '',
    email: '',
    name: '',
    message: '',
  });

  const togglePanel = () => {
    setStep(1);
    setTicket({
      category: '',
      email: '',
      name: '',
      message: '',
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTicket(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySubmit = e => {
    e.preventDefault();
    if (ticket.category) {
      setStep(2);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can send ticket data to backend/API for saving
    console.log('Ticket submitted:', ticket);
    togglePanel();
  };

  return (
    <>
      <FloatingButton onClick={togglePanel}>
        {step > 1 ? '×' : '+'}
      </FloatingButton>
      {(step === 1 || step === 2) && (
        <TicketPanel>
          <PanelHeader>
            <HeaderTitle>BIFROST</HeaderTitle>
            <CloseButton onClick={togglePanel}>×</CloseButton>
          </PanelHeader>
          <PanelBody>
            {step === 1 && (
              <form onSubmit={handleCategorySubmit}>
                <FormField>
                  <Label htmlFor="category">Choose Category</Label>
                  <Select
                    id="category"
                    name="category"
                    value={ticket.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      -- Choose Category --
                    </option>
                    <option value="Games">Games</option>
                    <option value="General">General</option>
                    <option value="Other">Other</option>
                    <option value="Work">Work</option>
                    <option value="Billing">Billing</option>
                  </Select>
                </FormField>
                {ticket.category === 'Games' && (
                  <GameLinks>
                    <GameLinkItem>
                      <LinkText href="#help">Are you stuck?</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <LinkText href="#faq">Check our FAQ</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <LinkText href="#tips">Game Tips & Tricks</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <LinkText href="#support">Contact Game Support</LinkText>
                    </GameLinkItem>
                  </GameLinks>
                )}
                <NextButton type="submit">Next</NextButton>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <FormField>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={ticket.email}
                    onChange={handleChange}
                    required
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={ticket.name}
                    onChange={handleChange}
                    required
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    id="message"
                    name="message"
                    rows="4"
                    value={ticket.message}
                    onChange={handleChange}
                    required
                  />
                </FormField>
                <SubmitButton type="submit">Submit</SubmitButton>
              </form>
            )}
          </PanelBody>
        </TicketPanel>
      )}
    </>
  );
};

export default Bifrost;
