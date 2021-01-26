import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import NameInput from '../src/components/NameInput';
import ImgLogo from '../src/components/ImgLogo';
import QuizContainer from '../src/components/QuizContainer';
import StartButton from '../src/components/StartButton';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <ImgLogo src={db.logo} alt="Logotipo The Witcher" />
          <Widget>
            <Widget.Header>
              <h1>The Witcher</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Quiz feito para amantes da série de JOGOS
                da trilogia The Witcher,
                produzidos pela desenvolvedora CD Projekt Red
              </p>
              <form onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <NameInput
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Digite seu nome"
                />
                <StartButton type="submit" disabled={name.length === 0}>
                  INICIAR QUIZ
                </StartButton>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>
                Da uma olhada nesses quizes incríveis que a
                galera da Imersão React Next.js fez:
              </p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz" />
      </QuizBackground>
    </>
  );
}
