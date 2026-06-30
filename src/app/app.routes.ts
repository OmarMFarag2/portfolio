import { Routes } from '@angular/router';
import { Frontend } from './frontend/frontend';
import { Home as frontHome } from './frontend/home/home';
import { Dashboard } from './dashboard/dashboard';
import { Home as dashHome } from './dashboard/home/home';
import { Skills as frontSkills } from './frontend/skills/skills';
import { Projects as frontProjects } from './frontend/projects/projects';
import { Skills as dashSkills } from './dashboard/skills/skills';
import { Projects as dashProjects } from './dashboard/projects/projects';
import { Contact as Frontcontact } from './frontend/contact/contact';
import { Contact as dashContact } from './dashboard/contact/contact';
import { Messages } from './dashboard/messages/messages';

export const routes: Routes = [
    {
        path: '', component: Frontend, children: [
            { path: '',redirectTo:'home',pathMatch:'full'},
            { path: 'home', component: frontHome },
            { path: 'projects', component: frontProjects },
            { path:'skills',component:frontSkills},
            { path:'contact',component:Frontcontact},
        ]
    },
    {
        path: 'dashboard', component: Dashboard, children: [
            { path: '',redirectTo:'home',pathMatch:'full'},
            { path: 'home', component: dashHome },
            { path: 'skills', component: dashSkills },
            { path: 'projects', component: dashProjects },
            { path: 'contact', component: dashContact },
            { path: 'messages', component: Messages }
        ]
    },
];
