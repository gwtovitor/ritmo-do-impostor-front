import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Loby from '../pages/Loby/Loby';


function AppRoutes() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/loby/:id" element={<Loby/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
