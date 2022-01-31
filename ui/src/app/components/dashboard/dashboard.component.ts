import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { WeatherSummary } from 'src/app/services/api.service.types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    weatherSummaries: WeatherSummary[] = [];
    isLoading = true;

    private isDestroyed$ = new Subject<void>();

    constructor(private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.apiService
            .getWeatherSummary()
            .pipe(
                finalize(() => (this.isLoading = false)),
                takeUntil(this.isDestroyed$)
            )
            .subscribe((weatherSummary) => (this.weatherSummaries = weatherSummary));
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next();
        this.isDestroyed$.complete();
    }
}
