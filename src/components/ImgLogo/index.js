import styled from 'styled-components';

const ImgLogo = styled.img`
  width: 200px;
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default ImgLogo;
