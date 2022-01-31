import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ConditionDescriptions, WeatherSummary } from 'src/app/services/api.service.types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    weatherSummaries: WeatherSummary[] = [];
    isLoading = true;

    private isDestroyed$ = new Subject<void>();

    constructor(private readonly apiService: ApiService, public readonly router: Router) {}

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

    currentConditionsIcon(description: ConditionDescriptions): string {
        const descriptionsMapper: Record<ConditionDescriptions, string> = {
            ['sunny']: 'sunny',
            ['partly sunny']: 'partly-sunny',
            ['mostly sunny']: 'sunny',
            ['partly cloudy']: 'partly-sunny',
            ['mostly cloudy']: 'partly-sunny',
            ['cloudy']: 'cloudy',
            ['overcast']: 'cloudy',
            ['mist']: 'shower',
            ['rain']: 'shower',
            ['drizzle']: 'shower',
            ['stormy']: 'windy-cloudy',
            ['scattered thunderstorms']: 'stormy',
            ['thunderstorms']: 'stormy',
            ['heavy thunderstorms']: 'downpour',
            ['fog']: 'windy',
            ['hazy']: 'windy',
        };

        return `typcn:weather-${descriptionsMapper[description]}`;
    }

    async goToWeatherDetails(summary: WeatherSummary): Promise<void> {
        await this.router.navigateByUrl(`location/${summary.guid}`);
    }
}
