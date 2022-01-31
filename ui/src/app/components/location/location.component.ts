import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, switchMap, takeUntil } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { ConditionDescriptions, WeatherDetails } from '../../services/api.service.types';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, OnDestroy {
    weatherDetails: WeatherDetails;
    isLoading = true;

    private isDestroyed$ = new Subject<void>();

    constructor(private readonly route: ActivatedRoute, private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params) => {
                    return this.apiService
                        .getWeatherDetailsByLocation(params['guid'])
                        .pipe(finalize(() => (this.isLoading = false)));
                }),
                takeUntil(this.isDestroyed$)
            )
            .subscribe((weatherDetails) => (this.weatherDetails = weatherDetails));
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
}
