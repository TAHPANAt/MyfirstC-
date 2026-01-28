import { Route } from 'react-router-dom';
import ItemsPage from '../pages/Item/ItemsPage';

// You can add more item related routes here later (e.g., detail, edit, create)
export const ItemRoutes = (
    <>
        <Route path="/items" element={<ItemsPage />} />
    </>
);

export default ItemRoutes;
