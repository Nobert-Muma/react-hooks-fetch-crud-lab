import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [question, setQuestion]=useState([]);
  useEffect(()=>{
    let isMounted=true;
    fetch("http://localhost:4000/questions")
    .then(response=>response.json())
    .then((data)=>{
      if(isMounted)
      setQuestion(data)});
  }, [])
  function handleNewQuestion(newQuestion){
    setQuestion(previousQuestions=>[...previousQuestions, newQuestion])
  }
  function handleDelete(deleteItem){
    const updatedItems=question.filter((eachQuestion)=>eachQuestion.id!==deleteItem.id);
    setQuestion(updatedItems)
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionAdded={handleNewQuestion} /> : <QuestionList questions={question} onDelete={handleDelete} />}
    </main>
  );
}

export default App;
