/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import db from '../../../db.json';
import QuizBackground from '../../components/QuizBackground';
import GitHubCorner from '../../components/GitHubCorner';
import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import CircleLoader from '../../components/CircleLoader';

const ResultWidget = ({ results }) => (
  <Widget>
    <Widget.Header>
      Resultado final
    </Widget.Header>

    <Widget.Content>
      <p>
        {results.filter((correct) => correct).length >= (db.questions.length / 2.0) ? 'Parabéns! Você acertou' : 'Que pena! Você acertou somente'}
        {' '}
        {`
      ${results.filter((correct) => correct).length} 
      de 
      ${db.questions.length}`}
      </p>
      <ul>
        {results.map((result, index) => (
          <li key={`result__${result}`}>
            <p>
              {`Pergunta ${index + 1}: ${result === true ? 'Acertou' : 'Errou'}`}
            </p>
          </li>
        ))}
      </ul>
    </Widget.Content>
  </Widget>
);

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      <CircleLoader />
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question,
  questionIndex,
  onSubmit,
  addResult,
}) => {
  const [selectedAlt, setSelectedAlt] = useState(undefined);
  const [questionSubmited, setQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlt === question.answer;
  const hasAlternativeSelected = selectedAlt !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setQuestionSubmited(false);
            setSelectedAlt(undefined);
          }, 2 * 800);
        }}
        >
          {question.alternatives.map((alt, altIndex) => {
            const alternativeId = `alternative__${altIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlt === altIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={questionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlt(altIndex)}
                  type="radio"
                />
                {alt}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {questionSubmited && isCorrect && <p>Você acertou!</p>}
          {questionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  const addResult = (result) => {
    setResults([
      ...results,
      result,
    ]);
  };

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
      <QuizBackground backgroundImage={externalBg}>
        <QuizContainer>

          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <ResultWidget results={results} />}

        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz" />
      </QuizBackground>
    </>
  );
}
