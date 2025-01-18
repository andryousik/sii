import "../styles/App.css";
import UploadImage from "./UploadImage";
import SearchImage from "./SearchImage";
import Modal from "./Modal";

function App() {
    return (
        <div className="App">
            <div className="app__wrapper">
                <h1>Searching images</h1>
                <div className="app__inner">
                    <SearchImage />
                    <UploadImage />
                </div>
            </div>
            <Modal />
        </div>
    );
}

export default App;
