import { useState } from 'react';
import { auth } from './config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link} from 'react-router-dom';
import './quiz.css';

function Quiz(){
    return (
        <div>
        <section className="quiz_background">
        </section>
        </div>
    )
}