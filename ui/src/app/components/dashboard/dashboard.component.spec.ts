import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiService } from 'src/app/services/api.service';
import { DashboardComponent } from './dashboard.component';
import { WeatherSummary } from 'src/app/services/api.service.types';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    let apiService: ApiService;

    const mockWeatherSummary: WeatherSummary = {
        guid: 'd74b4f8c-48a3-4a4b-9b89-a3a560bc309a',
        city: 'Indianapolis',
        state: 'IN',
        description: 'sunny',
        currentHumidity: 80,
        currentWindSpeed: 10,
        currentTemperature: 75,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [RouterTestingModule, HttpClientModule],
        }).compileComponents();

        apiService = TestBed.inject(ApiService);
    });

    beforeEach(() => {
        spyOn(apiService, 'getWeatherSummary').and.returnValue(of([mockWeatherSummary]));

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const element = fixture.debugElement.query(By.css('.city'));
        expect(component.weatherSummaries).toEqual([mockWeatherSummary]);
        const city = element.nativeElement as HTMLSpanElement;
        expect(city.textContent).toBe('Indianapolis');
    });
});
