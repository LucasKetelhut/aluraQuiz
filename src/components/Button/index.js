import styled from 'styled-components';

const StartButton = styled.button`
  width: 100%;
  height: 40px;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.primary};
  outline: none;

  :hover {
    background-color: #aa2e25;
    cursor: pointer;
  }

  :disabled {
    background-color: ${({ theme }) => theme.colors.secondary};

    :hover {
      cursor: not-allowed;
    }
  }
`;

export default StartButton;
