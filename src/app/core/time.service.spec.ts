import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TimeService} from './time.service';
import {Router} from '@angular/router';
import {JsonServerService} from './json-server.service';

const router = {
  navigate: jasmine.createSpy('navigate')
}

class MockJsonServerService {
  getPenaltyPoitsMode() {
    return false;
  }
}

describe('TimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: Router, useValue: router},
      {provide: JsonServerService, useClass: MockJsonServerService}
    ],
  }));

  it('should be created', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service).toBeTruthy();
  });

  it('should be decrease time', fakeAsync(() => {
    const service: TimeService = TestBed.get(TimeService);
    const spy = spyOn(service, 'prepareTimeString').and.callThrough();
    service.decreaseTimeLeft(0.1);
    tick(16000);
    expect(spy).toHaveBeenCalled();
  }));
});
