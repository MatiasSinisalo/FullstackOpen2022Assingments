
  const Header = ({text}) => {
    return(
    <h1>{text}</h1>
    )
  }

  const Part = (props) =>{
    return(
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
  const Content = ({parts}) =>{
   
    return(
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  const Total = ({parts}) =>{
  
    const startVal = 0
    const total = parts.reduce((currentSum, part) => currentSum + part.exercises, startVal)
  
    return(
    <>
      <p>
        Total of exercises: {total}
      </p>
    </>
    )
  }
  
  const Course = ({course}) =>{
    return(
      <>
       <Header text={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }
  
 

export default Course