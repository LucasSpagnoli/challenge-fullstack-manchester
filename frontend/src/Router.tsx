import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import FeedPage from './Pages/FeedPage'
import PreferencesPage from './Pages/PreferencePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/preferences' element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
