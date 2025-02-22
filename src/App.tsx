import './App.css'
import Layout from "./app/Layout.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {

  return (
    <Provider store={store}>
        <Layout/>
    </Provider>
  )
}

export default App
