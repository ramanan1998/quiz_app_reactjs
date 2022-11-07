import React, {useState, useEffect} from "react";
import axios from "axios";
import "../App.css";
import { nanoid } from "nanoid";

export default function Quiz(){

    const [questions, setQuestions] = useState([]);
    const [checkAnswer, setCheckAnswer] = useState({ correctAnswers : 0, isDone : false});

    function generateRandomOptionsArray(arr){
        let myArr = [];
        while(myArr.length !== arr.length){
            let rand = Math.floor(Math.random() * arr.length);
            if(!myArr.includes(arr[rand])){
                myArr.push(arr[rand]);
            }
        }
        return myArr;
    }

    async function fetchQuestions(){
        try{
            const {data} = await axios.get("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple");
            const {results} = data;
            let ques = [];
            for(let i = 0; i < results.length; i++){
                ques.push({id : i, selectedAnswer : "", options : generateRandomOptionsArray([...results[i].incorrect_answers, results[i].correct_answer]), ...results[i]})
            }
            setQuestions(ques); 
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchQuestions();
    },[]);

    function checkAnswers(){
        if(checkAnswer.isDone){
            setCheckAnswer({ correctAnswers : 0, isDone : false});
            fetchQuestions();
            window.location.reload()
            
        }else{
            setCheckAnswer(prevState => {return {...prevState, isDone : true}})
            questions.map(question => {
                if(question.selectedAnswer === question.correct_answer){
                    return setCheckAnswer(prevState => {
                        return {
                            ...prevState,
                            correctAnswers : prevState.correctAnswers + 1
                        }
                    })
                } 
            })
        }
    }

    console.log(questions);

    function handleChange(event){
        setQuestions(question => {
            return question.map(item => {
                return item.id === Number(event.target.name) ? {...item, selectedAnswer : event.target.value} : item
            })
        })
    }

    return(
        <main className="main-container">
            <h2>Try some Quizzickles</h2>
            <form className="form-container">
                {questions.map(question => {
                        return (
                            <div className="question" key={question.id}>
                                <legend>{question.question}</legend>
                                {question.options.map(option => {
                                    return (
                                        <div 
                                            style={checkAnswer.isDone && question.correct_answer === option ? {backgroundColor : "#94D7A2"} 
                                                : checkAnswer.isDone && question.correct_answer !== option && option === question.selectedAnswer 
                                                ? {backgroundColor : "#F8BCBC"} 
                                                : {backgroundColor : "#D6DBF5"}}
                                            className="options"
                                            key={nanoid()}>
                                            <input 
                                                disabled={checkAnswer.isDone} 
                                                className="checkbox-budget" 
                                                type="radio" 
                                                value={option} 
                                                name={question.id} 
                                                checked={question.selectedAnswer === option} 
                                                onChange={handleChange} 
                                            />
                                            <label>{option}</label>
                                        </div>
                                    )
                                })}
                                <hr />
                            </div>
                        )
                    })} 
            </form>
            <div className="result-and-button">
                <button disabled={!questions.every(item => item.selectedAnswer !== "")} onClick={checkAnswers} className="check-answers">{checkAnswer.isDone ? "Play again" : "Check Answers"}</button>
                <strong>{checkAnswer.isDone && `You have scored ${checkAnswer.correctAnswers}/${questions.length} correct answers`}</strong>
            </div>
        </main>
    )
}
