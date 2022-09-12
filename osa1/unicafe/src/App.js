import { useState } from 'react'


const Header = (props) =>{
  return(
  <>
    <h1>{props.title}</h1>
  </>
  )
} 

const Button = (props) =>{
 
return(
  <>
   <button onClick={props.button.function}>{props.button.text}</button>
  </>
)
}


const VoteButtons = (props) =>{
  
  return(
    <>
      <Button button={props.buttons[0]}/>
      <Button button={props.buttons[1]}/>
      <Button button={props.buttons[2]}/>
    </>
  )
}

const StatisticsLine = (props) =>{
  return(
  <tr>
    <td>{props.text}</td>
    <td> {props.value}</td>
  </tr>
  )
}


const Statistics = (props) =>{
  const calculateAvg = () =>{
    const sum = props.good - props.bad
    const avg = sum / props.count
    return avg
  }
  
  const calculateGoodPercent = () => {
    return props.good / props.count * 100
  }
  if(props.count > 0){
    return(
      <>
      <table>
        <tbody>
        <StatisticsLine text={"good"} value={props.good}/>
        <StatisticsLine text={"neutral"} value={props.neutral}/>
        <StatisticsLine text={"bad"} value={props.bad}/>
        <StatisticsLine text={"average"} value={calculateAvg()}/>
        <StatisticsLine text={"positive"} value={calculateGoodPercent()}/>
        </tbody>
      </table>
     
      </>
     )
  }
  else{
    return(
      <>
        <p>No feedback given</p>
      </>
     )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  
  const increaseGood = () =>{
    setGood(good + 1)
    setCount(count + 1)
  }

  const increaseNeutral = () =>{
    setNeutral(neutral + 1)
    setCount(count + 1)
 }

 const increaseBad = () =>{
  setBad(bad + 1)
  setCount(count + 1)
}

const buttons = [
  {
    function : increaseGood,
    text : "good"
  },
  {
    function : increaseNeutral,
    text : "neutral"
  },
  {
    function : increaseBad,
    text : "bad"
  }
]

  return (
    <>
      <Header title="give feedback"/>
      <VoteButtons buttons={buttons}/>
      <Header title="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} count={count}/>
    </>
  )
}

export default App