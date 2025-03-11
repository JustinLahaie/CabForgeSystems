import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #000000;
  color: #ffffff;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 1rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #888;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CTAButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-top: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: #111;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  
  h3 {
    color: #0066cc;
    margin-bottom: 1rem;
  }
  
  p {
    color: #888;
  }
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <h1>Welcome to CabForge Systems</h1>
        <p>Transforming spaces with premium cabinet solutions tailored to your needs</p>
        <CTAButton>Explore Our Collection</CTAButton>
      </Hero>
      
      <FeaturesGrid>
        <FeatureCard>
          <h3>Custom Design</h3>
          <p>Personalized cabinet solutions that match your style and space</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Quality Materials</h3>
          <p>Premium materials ensuring durability and longevity</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Expert Installation</h3>
          <p>Professional installation by experienced craftsmen</p>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default HomePage; 