import DraggableGalleryContainer from "./components/DraggableGalleryContainer";
import ActionBar from "./components/ActionBar";
import StateProvider from "./context/Store";
import "./App.css"

const App = () => {
  return (
    <StateProvider>
      <div className="container">
        <div className="layout">
          <ActionBar />
          <DraggableGalleryContainer />
        </div>
      </div>
    </StateProvider>
  );
};

export default App;
