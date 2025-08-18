import { StoreProvider } from "@/store/index.tsx";
import Matrix from "./components/Matrix";

function App() {
  return (
    <>
      <StoreProvider>
        <div
          style={{ display: "flex", flexBasis: 0, justifyContent: "center" }}
        >
          <div
            style={{ display: "flex", margin: "32px", background: "#9ead86" }}
          >
            <Matrix />
          </div>
        </div>
      </StoreProvider>
    </>
  );
}

export default App;
