import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import NameInput from '../src/components/NameInput';
import ImgLogo from '../src/components/ImgLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <ImgLogo src={db.logo} alt="Logotipo The Witcher" />
          <Widget
            as={motion.section}
            transition={{ duration: 0.5 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
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
                  name="userName"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Digite seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  INICIAR QUIZ
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
            as={motion.section}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li key={linkExterno}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '100%' },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz" />
      </QuizBackground>
    </>
  );
}
