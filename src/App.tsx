import React, { useContext } from 'react';
import Quiz from './components/Quiz';
import './App.css';

import QuizContextContainer from './Context/QuizContext';

const App = () => {

  return (
    <div className="App">
      <QuizContextContainer >
        <Quiz />
      </QuizContextContainer>

    </div>
  );
}

export default App;
