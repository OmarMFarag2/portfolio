import { Routes } from '@angular/router';
import { Frontend } from './frontend/frontend';
import { Home as frontHome } from './frontend/home/home';
import { Dashboard } from './dashboard/dashboard';
import { Home as dashHome } from './dashboard/home/home';
import { Skills as frontSkills } from './frontend/skills/skills';
import { Projects as frontProjects } from './frontend/projects/projects';

export const routes: Routes = [
    {
        path: '', component: Frontend, children: [
            { path: '',redirectTo:'home',pathMatch:'full'},
            { path: 'home', component: frontHome },
            { path: 'projects', component: frontProjects },
            { path:'skills',component:frontSkills},
        ]
    },
    {
        path: 'dashboard', component: Dashboard, children: [
            { path: 'home', component: dashHome },
            // { path:'home',component:frontHome},
        ]
    },
];
