import { Routes } from '@angular/router';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { UserManagement } from './pages/user-management/user-management';
import { ProductManagement } from './pages/product-management/product-management';
import { ArticleManagement } from './pages/article-management/article-management';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardHome },
    { path: 'users', component: UserManagement },
    { path: 'products', component: ProductManagement },
    { path: 'articles', component: ArticleManagement }
];
