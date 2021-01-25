import Head from 'next/head';
import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <>
    <Head>
      <title>The Witcher Quiz</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href={db.ico} type="image/x-icon" />
      <meta property="og:image" content={db.bg} />
      <meta property="og:title" content={db.title} />
      <meta property="og:description" content={db.description} />
    </Head>
    <QuizBackground backgroundImage = {db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The Witcher</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Quiz feito para amantes da série de JOGOS da trilogia The Witcher, produzidos pela desenvolvedora CD Projekt Red
            </p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasKetelhut/aluraQuiz"/>
    </QuizBackground>
    </>
  )
}
