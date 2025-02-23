import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Import LinkedIn and GitHub icons
import styled from "styled-components";

const SocialLink = styled.a`
  color: #452f13;
  font-size: 24px;
  margin-right: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #00A0DC;
  }
`;

const AuthorSocial = styled.div`
  margin-top: 10px;
`;
// Styled components for better design
const Container = styled.main`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background: linear-gradient(to bottom right, bisque, #e0e7ef);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #452f13;
  text-align: center;
`;

const Section = styled.section`
  margin: 20px 0;
`;

const AuthorCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  margin: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const AuthorName = styled.h3`
  color: #452f13;
`;

const AuthorMajor = styled.p`
  color: #7f8c8d;
`;

const StyledLink = styled.a`
  color: #2980b9;
  
  &:hover {
    text-decoration: underline;
    color: #3498db; /* Change color on hover */
  }
`;

const AboutPage = () => {
  
    const websiteDescription = `
      Our platform provides a comprehensive tool for analyzing biodiversity and its ecological impact.
      Users can input data such as latitude or species ID to retrieve detailed information on the biodiversity
      in that region. We aim to raise awareness and support sustainable development through accessible, data-driven insights.
    `;

    const authors = [
      { 
        name: "HungHsu Chen", 
        major: "Computer Science", 
        linkedin: "https://www.linkedin.com/in/chhallen/",
      },
      { 
        name: "Xiakun Zeng", 
        major: "Computer Science & Math", 
        linkedin: "https://www.linkedin.com/in/xiankun-zeng-165b5b34a/",
      },
      { 
        name: "Jerry ", 
        major: "Computer Science & Biology", 
        linkedin: "https://www.linkedin.com/in/jerry-teixeira-a15b111aa/",
      },
      { 
        name: "Quinn", 
        major: "Information Technology", 
        linkedin: "https://www.linkedin.com/in/quinn-flanigan/",
      },
      { 
        name: "Lingjie Su", 
        major: "Econ & CS", 
        linkedin: "https://www.linkedin.com/in/lingjie-su-74267734b/"
      }
    ];

    const githubRepo = "https://github.com/your-repo-link"; // Replace with your repo link

    return (
      <Container>
        <Title>About Us</Title>
        
        <Section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to{" "}
            <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>organize</span> the world’s{" "}
            <span style={{ fontWeight: 'bold', color: '#e67e22' }}>information</span> and make it{" "}
            <span style={{ fontWeight: 'bold', color: '#27ae60' }}>universally accessible</span> and{" "}
            <span style={{ fontWeight: 'bold', color: '#2980b9' }}>useful</span>.
          </p>
        </Section>
        
        <Section>
          <h2>Website Description</h2>
          <p>{websiteDescription}</p>
        </Section>

        <Section>
          <h2>Meet the Authors</h2>
          {authors.map((author) => (
            <AuthorCard key={author.name}>
            <AuthorName>{author.name}</AuthorName>
            <AuthorMajor>{author.major}</AuthorMajor>
            <AuthorSocial>
              <SocialLink href={author.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href={author.github} targer="_blank" rel="noopener noreferrer">
                <FaGithub/>
              </SocialLink>
            </AuthorSocial>
          </AuthorCard>
          ))}
        </Section>

        <Section>
          <h2>Project Repository</h2>
          <p>
            View the source code for this project on GitHub:
            <StyledLink href={githubRepo} target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </StyledLink>
          </p>
        </Section>

        <Section>
          <h2>Citations</h2>
          <p>
            Our Application uses the{" "}
            <StyledLink href="https://techdocs.gbif.org/en/openapi/v1/species#/Species/getNameUsageDistributions" target="_blank" rel="noopener noreferrer">
              GBIF API reference
            </StyledLink>{" "}
            for mapping and geospatial analysis.
          </p>
          <p>
            As well as {" "}
            <StyledLink href="https://data.huh.harvard.edu/databases/" target="_blank" rel="noopener noreferrer">
              Harvard University Herbaria & Libraries
            </StyledLink>{" "}
            for database and specimens.
          </p>
        </Section>

        {/* Footer Section */}
        <footer style={{ textAlign: 'center', marginTop: '20px', color:'#7f8c8d' }}>
          © {new Date().getFullYear()} Biodiversity Awareness. All rights reserved.
        </footer>
      </Container>
    );
};

export default AboutPage;

