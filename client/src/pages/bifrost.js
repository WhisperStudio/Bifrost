// bifrost.js
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaQuestionCircle, FaInfoCircle, FaGamepad, FaPhone } from 'react-icons/fa';

// Replace this with your custom image URL or import your image file
const BUTTON_IMAGE = 'https://i.ibb.co/yFxWgc0s/AJxt1-KNy-Zw-Rvqjji1-Teum-EKW2-C4qw-Tpl-RTJVy-M5s-Zx-VCwbq-Ogpyhnpz-T44-QB9-RF51-XVUc1-Ci-Pf8-N0-Bp.png'

// Elegant pop-up animation with bounce
const popUp = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Blinking animation for the floating button when panel is closed
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Floating button in bottom right corner with hover effect
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1100;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  /* Blinking only when panel is closed */
  ${props =>
    !props.isOpen &&
    css`
      animation: ${blink} 1.5s infinite;
    `}
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

// Ticket panel styled with calm, dark blue contrasts
const TicketPanel = styled.div`
  position: fixed;
  bottom: 130px; /* Positioned above the button */
  right: 20px;
  width: 400px;
  max-width: 90%;
  background: #f0f4f8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  animation: ${popUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transform-origin: bottom right;
  z-index: 1200;
`;

// Header with dark blue gradient and "BIFROST" title
const PanelHeader = styled.div`
  background: linear-gradient(135deg, #003366, #0055aa);
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

// Close button in header corner
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

// Panel body with very light blue background
const PanelBody = styled.div`
  padding: 20px;
  background: #e2e8f0;
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
  padding: 12px 16px;
  border: 1px solid #a0aec0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #0055aa;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #a0aec0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #0055aa;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #a0aec0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #0055aa;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #003366;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #002244;
  }
`;

const NextButton = styled(SubmitButton)`
  background-color: #0055aa;
  &:hover {
    background-color: #004488;
  }
`;

// Styled unordered list for Game Support links with icons
const GameLinks = styled.ul`
  margin: 10px 0 18px 0;
  padding-left: 20px;
`;

const GameLinkItem = styled.li`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const LinkText = styled.a`
  color: #003366;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Bifrost = () => {
  // isOpen: controls whether the panel is open or closed.
  // step: 1 for category selection, 2 for form completion.
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [ticket, setTicket] = useState({
    category: '',
    email: '',
    name: '',
    message: '',
  });

  const openPanel = () => {
    setTicket({
      category: '',
      email: '',
      name: '',
      message: '',
    });
    setStep(1);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
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
    closePanel();
  };

  return (
    <>
      <FloatingButton onClick={isOpen ? closePanel : openPanel} isOpen={isOpen}>
        {/* Replace the src with your chosen image */}
        <img src={BUTTON_IMAGE} alt="Ticket Icon" />
      </FloatingButton>
      {isOpen && (
        <TicketPanel>
          <PanelHeader>
            <HeaderTitle>BIFROST</HeaderTitle>
            <CloseButton onClick={closePanel}>×</CloseButton>
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
                      <IconWrapper>
                        <FaQuestionCircle color="#003366" />
                      </IconWrapper>
                      <LinkText href="#help">Are you stuck?</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <IconWrapper>
                        <FaInfoCircle color="#003366" />
                      </IconWrapper>
                      <LinkText href="#faq">Check our FAQ</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <IconWrapper>
                        <FaGamepad color="#003366" />
                      </IconWrapper>
                      <LinkText href="#tips">Game Tips & Tricks</LinkText>
                    </GameLinkItem>
                    <GameLinkItem>
                      <IconWrapper>
                        <FaPhone color="#003366" />
                      </IconWrapper>
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
