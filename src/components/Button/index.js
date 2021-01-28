import styled from 'styled-components';

const StartButton = styled.button`
  width: 100%;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.primary};
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  text-transform: uppercase;
  padding: 10px 16px;
  transition: .2s;
  line-height: 1.2;
  font-size: 14px;
  font-weight: bold;

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
