
const Notification = ({ notification }) => {

  return (
    <div className={notification.style}>
      {notification.message}
    </div>
  )
}

export default Notification