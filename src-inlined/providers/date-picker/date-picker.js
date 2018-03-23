"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var components_1 = require("../../components");
/*
  Generated class for the DatePickerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatePickerProvider = (function () {
    function DatePickerProvider() {
    }
    DatePickerProvider.prototype.showCalendar = function (modalCtrl, datePickerOption) {
        var _this = this;
        this.onDateSelected = new Subject_1.Subject();
        this.onDismiss = new Subject_1.Subject();
        this.onUnsubscribe = new Subject_1.Subject();
        var calendarModal = modalCtrl.create(components_1.DatePicker, datePickerOption);
        calendarModal.present();
        this.onDismiss
            .takeUntil(this.onUnsubscribe)
            .subscribe(function (result) { return _this.handleCalendarDismissed(result, calendarModal); });
        return this.onDateSelected.asObservable();
    };
    DatePickerProvider.prototype.handleCalendarDismissed = function (result, calendarModal) {
        if (result === 'dismiss') {
            calendarModal.dismiss();
        }
        else if (result instanceof Date) {
            this.onDateSelected.next(result);
            calendarModal.dismiss();
        }
    };
    DatePickerProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DatePickerProvider);
    return DatePickerProvider;
}());
exports.DatePickerProvider = DatePickerProvider;
//# sourceMappingURL=date-picker.js.map