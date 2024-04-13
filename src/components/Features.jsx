import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Features = () => {
  const [features, setFeatures] = useState([])
  const [paginationData, setPaginationData] = useState({
    current_page: 0,
    total: 0,
    per_page: 0
  })
  const [magType, setMagType] = useState("")

  useEffect(() => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`${import.meta.env.VITE_USGS_API_URL}/api/features`, requestOptions)
      .then((response) => response.json())
      .then((respData) => {
        setFeatures(respData.data)
        setPaginationData({ ...respData.pagination })
      })
      .catch(err => {
        console.log("ERROR:", err)
      })
  }, [])

  const handleMagType = (event) => {
    setMagType(event.target.value)
  }

  console.log(paginationData)

  return (
    <div className="text-center">
      <h2>Features</h2>
      <hr />
      <div className="mb-3 col-md-2">
        <label htmlFor="mag_type" className="form-label"> Mag Type </label>
        <select
          className="form-select form-select-sm"
          id="mag_type"
          name="mag_type"
          onChange={handleMagType}
          multiple
        >
          <option value="md">md</option>
          <option value="ml">ml</option>
          <option value="ms">ms</option>
          <option value="mw">mw</option>
          <option value="me">me</option>
          <option value="mi">mi</option>
          <option value="mb">mb</option>
          <option value="mlg">mlg</option>
        </select>
      </div>
      <table className="table table-stripped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>External ID</th>
            <th>Magnitude</th>
            <th>Place</th>
            <th>Time</th>
            <th>Tsunami</th>
            <th>Mag Type</th>
            <th>Title</th>
            <th>Coordinates</th>
            <th>External URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.type}</td>
              <td>{f.attributes.external_id}</td>
              <td>{f.attributes.magnitude}</td>
              <td>{f.attributes.place}</td>
              <td>{f.attributes.time}</td>
              <td>{f.attributes.tsunami ? 'YES' : 'NO'}</td>
              <td>{f.attributes.mag_type}</td>
              <td>{f.attributes.title}</td>
              <td>{f.attributes.coordinates.latitude}, {f.attributes.coordinates.longitude}</td>
              <td><Link to={f.attributes.links.external_url}>Link</Link></td>
              <td><Link to={`/features/${f.id}`}>Show</Link> <br /> <Link to={`/features/${f.id}/new_comment`}>Add Comment</Link></td>
            </tr>
          ))}
        </tbody>
      </table>


    </div >
  )
}

export default Features
