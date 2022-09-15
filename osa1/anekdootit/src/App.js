import { useState } from 'react'


const Anecdote = (props) =>{
  return (
    <>
      <p>
        {props.text}
      </p>
      <p>
        has {props.points} votes
      </p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const[mostPopular, setPopular] = useState(0)

  const chooseAnecdote = () =>{
    const randomFloatNumber = Math.random() * (anecdotes.length)
    setSelected(Math.floor(randomFloatNumber))
    console.log(selected)
  }

  const voteAnecdote = () =>{
    const newArr = [...points]
    newArr[selected] += 1
    
    if(newArr[selected] > points[mostPopular]){
      const newPopular = selected
      setPopular(newPopular)
    }
    
    setPoints(newArr)
  }
 
  return (
    <div>
    <Anecdote text = {anecdotes[selected]} points={points[selected]}/>
    <button onClick={voteAnecdote}>vote</button>
    <button onClick={chooseAnecdote}>next anecdote</button>
    <h1>Anecdote with most votes</h1>
    <Anecdote text = {anecdotes[mostPopular]} points={points[mostPopular]}/>

    </div>
  )
}

export default App