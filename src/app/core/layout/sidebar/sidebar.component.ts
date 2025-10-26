import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'Alunos', icon: 'bi-people', route: '/alunos' },
    { label: 'Responsáveis', icon: 'bi-person-badge', route: '/responsaveis' },
    { label: 'Turmas', icon: 'bi-collection', route: '/turmas' },
    { label: 'Disciplinas', icon: 'bi-journal-text', route: '/disciplinas' },
    { label: 'Matrículas', icon: 'bi-card-checklist', route: '/matriculas' },
    { label: 'Notas', icon: 'bi-clipboard-data', route: '/notas' }
  ];
}
