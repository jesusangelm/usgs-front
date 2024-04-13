import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TextArea from "../components/form/TextArea.jsx"

const NewComment = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState([])

  const hasError = (key) => {
    return errors.indexOf(key) !== -1
  }

  const [comment, setComment] = useState({
    body: "",
  })


  let { id } = useParams()

  const handleSubmit = (event) => {
    event.preventDefault()

    let errors = []
    let required = [
      { field: comment.body, name: "body" },
    ]

    required.forEach(function(obj) {
      if (obj.field === "") {
        errors.push(obj.name)
      }
    })

    setErrors(errors)

    if (errors.length > 0) {
      return false
    }

    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestBody = comment

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: 'POST',
      headers: headers,
    }

    fetch(`${import.meta.env.VITE_USGS_API_URL}/api/features/${id}/comments`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors)
        } else {
          navigate("/features")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChange = () => (event) => {
    let value = event.target.value
    let name = event.target.name
    setComment({
      ...comment,
      [name]: value,
    })
  }


  return (
    <div className="text-center">
      <h2>Add a comment for the feature #{id}</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={id} id="id" />

        <TextArea
          title={"Body"}
          name={"body"}
          value={comment.body}
          rows={"3"}
          onChange={handleChange("body")}
          errorMsg={"Please enter the comment body"}
          errorDiv={hasError("body") ? "text-danger" : "d-none"}
        />

        <hr />


        <hr />
        <button className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewComment
