import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './Redux/store.ts'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-bpz3fesbt2epuh37.us.auth0.com"
    clientId="T0QlEym5JqRr0qUNKHKuuBnokOAiZLhe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>,
)
