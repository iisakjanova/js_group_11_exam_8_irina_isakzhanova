import {BrowserRouter} from "react-router-dom";

import Quotes from "./containers/Quotes/Quotes";

const App = () => (
    <div className="App">
        <BrowserRouter>
            <Quotes />
        </BrowserRouter>
    </div>
);

export default App;
