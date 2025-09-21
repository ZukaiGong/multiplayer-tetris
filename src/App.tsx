import { StoreProvider } from "@/store/index.tsx";
import Matrix from "./components/Matrix";
import ControlButtons from "./components/ControlButtons";

function App() {
  return (
    <>
      <StoreProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", margin: "32px", background: "#9ead86" }}
          >
            <Matrix />
          </div>

          <ControlButtons />
        </div>
      </StoreProvider>
    </>
  );
}

export default App;
