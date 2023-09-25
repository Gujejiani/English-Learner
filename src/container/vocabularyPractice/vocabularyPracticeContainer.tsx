import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/dashboard/dashboard";
import { RootState } from "../../store/reducer";
import { selectVocabulary } from "../../store/vocabulary.slice.selectors";

export const VocabularyPracticeContainer: React.FC = () => {
  const vocabulary = useSelector(selectVocabulary);
  const vocabularyQuestion = useSelector(
    (state: RootState) => state.vocabulary.words,
  );

  return (
    <React.Fragment>
      <Dashboard
        vocabulary={vocabulary}
        vocabularyQuestion={vocabularyQuestion}
      />
    </React.Fragment>
  );
};

export default VocabularyPracticeContainer;
