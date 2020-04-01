import React, { useState, useEffect } from 'react';
import './App.css';

function GrandReveal({isOpen}) {
const [dadJoke, setDadJoke] = useState('');
  useEffect(() => {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => res && res.joke)
      .then(joke => setDadJoke(joke));
  }, [])
  return isOpen && <p>{dadJoke}</p>
}

function SpinLockDigit({digit, onChange}) {
  const incrementDigit = (digit + 1) % 10;
  const decrementDigit = digit > 0 ? digit - 1 : 9;
  return (
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', width: '48px'}}>
      <button onClick={() => onChange(incrementDigit)}>+</button>
      { digit }
      <button onClick={() => onChange(decrementDigit)}>-</button>
    </div>
  );
}

export default function App() {

  const password = [2, 2, 3];
  const [digits, setDigits] = useState([0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [numTries, setNumTries] = useState(0);

  let setDigitAtIndex = (digit, idx) => {
    setDigits((currentDigits) => [
      ...currentDigits.slice(0, idx),
      digit,
      ...currentDigits.slice(idx + 1)
    ])
  }

  let checkPassword = () => {
    for (let i = 0; i < password.length; i++) {
      const pass = password[i];
      if (pass !== digits[i]) {
        if(isUnlocked) {
          setIsUnlocked(false);
        }
        setNumTries((currentNumTries) => currentNumTries + 1);
        return;
      }
    }

    setIsUnlocked(true);
  }

  return (
    <section>
      <h1>Hello World</h1>
      <div style={{display: 'flex'}} >
        {
          digits.map((digit, idx) => 
            <SpinLockDigit key={idx} digit={digit} onChange={(newDigit) => setDigitAtIndex(newDigit, idx)} />
          )
        }
      </div>
      <button onClick={() => checkPassword()}>Press me</button>
      { !isUnlocked && numTries > 0 && <p className='status--locked'>You have have tried to unlock this {numTries} times!</p> }
      { isUnlocked && <p className='status--unlocked'>Unlocked!</p> }
      <GrandReveal isOpen={isUnlocked} />
    </section>
  );
}
