import { ToastContainer, Bounce } from 'react-toastify';
import AppRoutes from './routes/routes.jsx'

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <AppRoutes />
    </>
  );
}


export default App;