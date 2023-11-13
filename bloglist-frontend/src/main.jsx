import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotificationContextProvider } from './reducers/NotificationContext'
import { UserContextProvider } from './reducers/UserContent'
import { BlogsContextProvider } from './reducers/BlogsContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <BlogsContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BlogsContextProvider>
    </NotificationContextProvider>
  </UserContextProvider>
)
