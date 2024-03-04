import { Link, useRoutes } from "react-router-dom";
import routes from "@/router/routes";

function App() {
  const outlet = useRoutes(routes);

  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>

      {outlet}
    </>
  );
}

export default App;
