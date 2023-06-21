import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';

import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProcesoComponent } from './proceso/proceso.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';


import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { TreeTableModule } from 'primeng/treetable';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { TipoComponent } from './tipo/tipo.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsuariosComponent,
    DashboardComponent,
    MenuNavComponent,
    FooterComponent,
    ProcesoComponent,
    TipoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ConfirmPopupModule,
    OverlayPanelModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    SidebarModule,
    DialogModule,
    ImageModule,
    CalendarModule,
    FieldsetModule,
    ProgressBarModule,
    ChipModule,
    TreeTableModule,
    PanelModule,
    ToolbarModule,
    TagModule,
    TooltipModule,
    PasswordModule
  ]
})
export class DashboardModule { }
