import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="container">
            <h1>Quizzickle</h1>
            <Link to="quiz">
                <button className="start-quiz">Start Quiz</button>
            </Link>
        </div>
    )
}