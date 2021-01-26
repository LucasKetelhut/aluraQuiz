import React from 'react';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import ImgLogo from '../src/components/ImgLogo';
import QuizContainer from '../src/components/QuizContainer';

export default function QuizPage() {
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <ImgLogo src={db.logo} alt="Logotipo The Witcher" />
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz" />
      </QuizBackground>
    </>
  );
}
