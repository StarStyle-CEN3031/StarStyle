import './Quiz.css';

function Quiz(){
    return (
        <div>
            <section className="quiz-background"></section>
            <section className="pop-up">
                <h2>Find Your Style!</h2>
                <hr/>
                <h3>Which one do you like the best?</h3>
                <ul>
                    <li> answer choice 1</li>
                    <li> answer choice 2</li>
                    <li> answer choice 3</li>
                    <li> answer choice 4</li>
                </ul>
                <button>Next</button>
            <section className='index'>1 of 5 questions </section>
            </section>
        </div>
    )
}

export default Quiz;
