// import ColorPaletteTest from './design-system/ColorPaletteTest';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
