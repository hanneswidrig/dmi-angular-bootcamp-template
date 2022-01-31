import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private readonly location: Location, private readonly router: Router) {}

    backButtonVisible(): boolean {
        return this.router.url !== '/';
    }

    getPreviousRoute(): void {
        return this.location.back();
    }

    async goToHome(): Promise<void> {
        await this.router.navigateByUrl('');
    }
}
