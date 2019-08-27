import {TestBed} from '@angular/core/testing';
import {JsonServerService} from './json-server.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('JsonServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: JsonServerService = TestBed.get(JsonServerService);
    expect(service).toBeTruthy();
  });
});
