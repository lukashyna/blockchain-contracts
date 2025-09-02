import { Routes, Route } from "react-router-dom";

import Root from "./pages/Root";
import Voting from "./components/voting/Voting/Voting";
import BookMarketplace from "./components/bookMarketplace/BookMarketplace/BookMarketplace";
import NotFound from "./components/error/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/crypto" element={<Root />}>
        <Route path="marketplace" element={<BookMarketplace />} />
        <Route path="voting" element={<Voting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
