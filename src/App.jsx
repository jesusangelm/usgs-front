import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <div class="container">
        <h3 class="pb-4 mb-4 fst-italic border-bottom">
          Latest Features
        </h3>

        <section>
          <article class="blog-post">
            <h2
              class="display-5 link-body-emphasis mb-1">
              <p>link</p>

            </h2>
            <p class="blog-post-meta">
              time
            </p>

            <p>description</p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default App
