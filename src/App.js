import { RouterProvider } from 'react-router-dom';
import router from './routes/routes'; // Assuming this imports your router configuration

import RoutesComponent from './components/RoutesComponent'; // Import the component that interacts with the backend API

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      
      {/* Include the RoutesComponent for fetching and displaying routes */}
      <RoutesComponent />
    </div>
  );
}

export default App;
