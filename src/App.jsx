import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="container">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
            </div>
            <div className="col-4 text-center">
              USGS
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content">
            <Link to="/" className="nav-item nav-link link-body-emphasis">Home </Link>
            <Link to="/features" className="nav-item nav-link link-body-emphasis">Features</Link>
          </nav>
        </div>
      </div>

      <div className="container">
        <div>
          <Outlet context={{

          }} />
        </div>
      </div>
    </>
  )
}

export default App
