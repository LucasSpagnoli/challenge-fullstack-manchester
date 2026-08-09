import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import FeedPage from './Pages/FeedPage'
// import PreferencesPage from './Pages/PreferencePage'
import { RequireAuth, RedirectIfAuth, RequirePreferences } from './routes/guards'
import ClientPage from './Pages/ClientPage'
import { AuthProvider } from './api/lib/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RedirectIfAuth />}>
            <Route path='/' element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            {/* <Route path='/preferences' element={<PreferencesPage />} /> */}

            <Route element={<RequirePreferences />}>
              <Route path='/feed' element={<FeedPage />} />
            </Route>

            <Route path='/clients' element={<ClientPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App