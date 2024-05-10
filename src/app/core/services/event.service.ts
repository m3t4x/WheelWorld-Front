import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Annonce} from '../models/annonce.model';

const baseUrl = 'http://localhost:4300/RhestIA';

interface Event {
    type: string;
    payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
    providedIn: 'root'
})
export class EventService {


    private handler = new Subject<Event>();
    constructor(private http: HttpClient) { }


  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

    /**
     * Broadcast the event
     * @param type type of event
     * @param payload payload
     */
    broadcast(type: string, payload = {}) {
        this.handler.next({ type, payload });
    }

    /**
     * Subscribe to event
     * @param type type of event
     * @param callback call back function
     */
    subscribe(type: string, callback: EventCallback): Subscription {
        return this.handler.pipe(
            filter(event => event.type === type)).pipe(
                map(event => event.payload))
            .subscribe(callback);
    }
}
