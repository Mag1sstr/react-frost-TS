import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"

import "./i18n"

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Provider store={store}>
         <Suspense fallback={<div>Loading...</div>}>
            <App />
         </Suspense>
      </Provider>
   </StrictMode>
)
