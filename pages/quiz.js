/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import ImgLogo from '../src/components/ImgLogo';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      [Carregando questão]
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({ question, questionIndex, onSubmit }) => {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${` ${db.questions.length}`}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alt, altIndex) => {
            const alternativeId = `alternative__${altIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alt}
              </Widget.Topic>
            );
          })}

          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const router = useRouter();
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 800);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    return (
      // eslint-disable-next-line max-len
      nextQuestion < db.questions.length ? setCurrentQuestion(nextQuestion) : setScreenState(screenStates.RESULT)
    );
  };

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <ImgLogo
            src={db.logo}
            alt="Logotipo The Witcher"
            onClick={(event) => {
              event.preventDefault();
              router.push('/');
            }}
          />

          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              onSubmit={handleSubmit}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <div>Parabéns!</div>}

        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz" />
      </QuizBackground>
    </>
  );
}
