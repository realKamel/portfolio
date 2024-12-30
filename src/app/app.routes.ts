import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CVComponent } from './components/cv/cv.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'header', pathMatch: 'full' },
	{ path: 'header', component: HeaderComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'skills', component: SkillsComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'cv', component: CVComponent },
	{ path: 'contact', component: ContactComponent },
];
