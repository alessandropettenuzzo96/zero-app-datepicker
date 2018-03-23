import { ModalController, Modal } from "ionic-angular";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DatePickerOption } from '../../date-picker.interface';
export declare class DatePickerProvider {
    onUnsubscribe: Subject<any>;
    onDismiss: Subject<any>;
    onDateSelected: Subject<Date>;
    constructor();
    showCalendar(modalCtrl: ModalController | any, datePickerOption?: DatePickerOption): Observable<Date>;
    handleCalendarDismissed(result: any, calendarModal: Modal): void;
}
