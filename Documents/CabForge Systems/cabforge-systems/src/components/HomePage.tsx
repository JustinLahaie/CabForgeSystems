import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
`;

const PlaceholderText = styled.h1`
  font-size: 3rem;
  color: #0066cc;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <PlaceholderText>placeholder</PlaceholderText>
    </Container>
  );
};

export default HomePage; 