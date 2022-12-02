const Notification = (props) => {
   
    if(props.show === false){
        return null
    }
    
    return (
        <>
            <div style={{color: props.msgStyle}}><p>{props.msg}</p></div>
        </>
    )
}

export default Notification