import Matrix from "./components/Matrix";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexBasis: 0, justifyContent: "center" }}>
        <div style={{ display: "flex", margin: "32px", background: "#9ead86" }}>
          <Matrix />
        </div>
      </div>
    </>
  );
}

export default App;
