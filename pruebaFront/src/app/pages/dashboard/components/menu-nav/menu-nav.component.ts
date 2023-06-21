import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'menu-nav',
	templateUrl: './menu-nav.component.html',
	styleUrls: ['./menu-nav.component.scss'],
	providers: [ConfirmationService, MessageService]
})
export class MenuNavComponent {

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		public authService: AuthService,
		private confirmationService: ConfirmationService
	) { }

	cerrar(event: any) {
		this.confirmationService.confirm({
		  target: event.target,
		  message: 'Deseas cerrar sesion?',
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {
			this.authService.close();
		  },
		  reject: () => {
			 
		  }
	  	});
	}
}