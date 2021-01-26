import styled from 'styled-components';

const NameInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.mainBg};
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  color: ${({ theme }) => theme.colors.contrastText};

  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default NameInput;
