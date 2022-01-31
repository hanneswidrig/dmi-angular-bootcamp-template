import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComponent } from './location.component';

describe('LocationComponent', () => {
    let component: LocationComponent;
    let fixture: ComponentFixture<LocationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocationComponent],
            imports: [RouterTestingModule, HttpClientModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
