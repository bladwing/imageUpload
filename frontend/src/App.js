import './App.css'
import { useState } from 'react'


const Link = "http://localhost:5000/images/"

function App() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })

    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
    console.log(img)
    console.log(img.data.name)
    localStorage.setItem("photo", img.data.name)
  }
 const PhotoName = localStorage.getItem("photo") 

console.log(Link + PhotoName)

  return (
    <div className='App'>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' alt="profile"/>}
      <img src={Link + PhotoName} alt="Here will be ...." width='100' height='100'/>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}

      <button onClick={() => localStorage.removeItem("photo")}> REMOVE LC</button>
    </div>
  )
}

export default App
