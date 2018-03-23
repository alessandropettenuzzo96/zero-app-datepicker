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
var ionic_angular_1 = require("ionic-angular");
var moment = require("moment");
var date_picker_1 = require("../../providers/date-picker/date-picker");
var DatePicker = (function () {
    function DatePicker(datePickerProvider, params) {
        this.datePickerProvider = datePickerProvider;
        this.params = params;
        this.onDateSelected = new core_1.EventEmitter();
        this.onCancelled = new core_1.EventEmitter();
        this.daysGroupedByWeek = [];
        this.currentMoment = moment();
        this.datePickerOption = params && params.data ? params.data : this.datePickerOption;
        this.renderCalender();
    }
    DatePicker.prototype.ngOnDestroy = function () {
        this.datePickerProvider.onUnsubscribe.next();
        this.datePickerProvider.onUnsubscribe.complete();
    };
    DatePicker.prototype.setMonthBack = function () {
        this.currentMoment.subtract(1, "month");
        this.renderCalender();
    };
    DatePicker.prototype.setMonthForward = function () {
        this.currentMoment.add(1, "month");
        this.renderCalender();
    };
    DatePicker.prototype.setYearBack = function () {
        this.currentMoment.subtract(1, "year");
        this.renderCalender();
    };
    DatePicker.prototype.setYearForward = function () {
        this.currentMoment.add(1, "year");
        this.renderCalender();
    };
    DatePicker.prototype.cancel = function () {
        this.datePickerProvider.onDismiss.next('dismiss');
        this.datePickerProvider.onDismiss.complete();
    };
    DatePicker.prototype.confirmDateSelection = function () {
        this.datePickerProvider.onDismiss.next(this.selectedDateItem.momentDate.toDate());
    };
    DatePicker.prototype.renderCalender = function () {
        this.daysOfMonth = this.generateDaysOfMonth(this.currentMoment.year(), this.currentMoment.month() + 1, this.currentMoment.date());
        this.daysGroupedByWeek = this.groupByWeek(this.daysOfMonth);
        this.setTodayAsDefaultSelectedDate();
    };
    DatePicker.prototype.generateDaysOfMonth = function (year, month, day) {
        var calendarMonth = moment(year + "-" + month + "-" + day, "YYYY-MM-DD");
        var startOfMonth = calendarMonth.clone().startOf("month").day("sunday");
        var endOfMonth = calendarMonth.clone().endOf("month").day("saturday");
        var totalDays = endOfMonth.diff(startOfMonth, "days") + 1;
        var calendarDays = [];
        for (var i = 0; i < totalDays; i++) {
            var immunableStartOfMonth = startOfMonth.clone();
            var dateItem = {
                isSelected: false,
                momentDate: immunableStartOfMonth.add(i, "day"),
                isEnabled: true
            };
            dateItem.isEnabled = this.isBelongToThisMonth(immunableStartOfMonth, month) &&
                this.startingFrom(dateItem.momentDate) && this.endingAt(dateItem.momentDate);
            calendarDays.push(dateItem);
        }
        return calendarDays;
    };
    DatePicker.prototype.groupByWeek = function (daysOfMonth) {
        var groupedDaysOfMonth = new Array();
        daysOfMonth.forEach(function (item, index) {
            var groupIndex = Math.floor((index / 7));
            groupedDaysOfMonth[groupIndex] = groupedDaysOfMonth[groupIndex] || [];
            groupedDaysOfMonth[groupIndex].push(item);
        });
        return groupedDaysOfMonth;
    };
    DatePicker.prototype.selectDate = function (day) {
        if (!day.isEnabled)
            return;
        if (this.selectedDateItem && this.selectedDateItem.isSelected) {
            this.selectedDateItem.isSelected = false;
        }
        day.isSelected = true;
        this.selectedDateItem = day;
        this.currentMoment = day.momentDate.clone();
    };
    DatePicker.prototype.setTodayAsDefaultSelectedDate = function () {
        var today = moment().startOf("day");
        var foundDates = this.daysOfMonth
            .filter(function (item) { return today.isSame(item.momentDate.clone().startOf("day")); });
        if (foundDates && foundDates.length > 0) {
            this.selectedDateItem = foundDates[0];
            this.selectedDateItem.isSelected = true;
        }
    };
    DatePicker.prototype.isBelongToThisMonth = function (momentDate, month) {
        return momentDate.month() + 1 === month;
    };
    DatePicker.prototype.startingFrom = function (currentMomentDate) {
        if (!this.datePickerOption || !this.datePickerOption.minimumDate)
            return true;
        var startOfMinimumDay = this.datePickerOption.minimumDate.setHours(0);
        return currentMomentDate.startOf('day')
            .isSameOrAfter(moment(startOfMinimumDay).startOf('day'));
    };
    DatePicker.prototype.endingAt = function (endingMomentDate) {
        if (!this.datePickerOption || !this.datePickerOption.maximumDate)
            return true;
        var startOfMaximumDay = this.datePickerOption.maximumDate.setHours(0);
        return endingMomentDate.startOf('day')
            .isSameOrBefore(moment(startOfMaximumDay).startOf('day'));
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatePicker.prototype, "onDateSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatePicker.prototype, "onCancelled", void 0);
    DatePicker = __decorate([
        core_1.Component({
            selector: 'date-picker',
            template: "\n    <div class=\"date-picker\">\n      <div class=\"layout-col horizontal-center layout-background\">\n        <div class=\"layout-col horizontal-center top-banner\">\n          <div class=\"dayofweek padding-5\">{{currentMoment.format('dddd')}}</div>\n          <div class=\"text-center padding-10\">\n            <div class=\"padding-5\">\n              <ion-icon class=\"arrow\" name=\"arrow-back\" tappable (click)=\"setMonthBack()\"></ion-icon>\n              <span class=\"month padding-10\">{{currentMoment.format('MMM')}}</span>\n              <ion-icon class=\"arrow\" name=\"arrow-forward\" tappable (click)=\"setMonthForward()\"></ion-icon>\n            </div>\n            <div class=\"day padding-5\">{{currentMoment.format('D')}}</div>\n            <div class=\"text-center padding-5\">\n              <ion-icon class=\"arrow\" name=\"arrow-back\" tappable (click)=\"setYearBack()\"></ion-icon>\n              <span class=\"year padding-10\">{{currentMoment.format('YYYY')}}</span>\n              <ion-icon class=\"arrow\" name=\"arrow-forward\" tappable (click)=\"setYearForward()\"></ion-icon>\n            </div>\n          </div>\n        </div>\n        <div class=\"month-year\">{{currentMoment.format('MMMM YYYY')}}</div>\n        <div class=\"calendar-item-container\">\n          <div class=\"layout-row day-item-header\">\n            <div class=\"day-item-header-item\">S</div>\n            <div class=\"day-item-header-item\">M</div>\n            <div class=\"day-item-header-item\">T</div>\n            <div class=\"day-item-header-item\">W</div>\n            <div class=\"day-item-header-item\">T</div>\n            <div class=\"day-item-header-item\">F</div>\n            <div class=\"day-item-header-item\">S</div>\n          </div>\n          <div class=\"layout-row day-container\" *ngFor=\"let week of daysGroupedByWeek;\">\n            <div class=\"day-item\" [ngClass]=\"{'day-selected': day.isSelected, 'day-disabled': !day.isEnabled}\" *ngFor=\"let day of week;\" tappable (click)=\"selectDate(day)\">{{day.momentDate.date()}}</div>\n          </div>\n        </div>\n        <div class=\"layout-row action-container\">\n          <button class=\"cancel-button button button-md button-clear button-clear-md\" clear (click)=\"cancel()\">Cancel</button>\n          <button clear class=\"ok-button button button-md button-clear button-clear-md\" (click)=\"confirmDateSelection()\">OK</button>\n        </div>\n\n\n      </div>\n    </div>\n  ",
            styles: ["\n    .date-picker .layout-row{display:flex;flex-direction:row}.date-picker .layout-col{display:flex;flex-direction:column}.date-picker .horizontal-center{align-items:center}.date-picker .text-center{text-align:center}.date-picker .layout-background{background-color:white;height:100%}.date-picker .padding-5{padding:5px}.date-picker .padding-10{padding:10px}.date-picker .arrow{margin-left:10px;margin-right:10px}.date-picker .day-item-header{width:100%;flex-wrap:wrap;text-align:center}.date-picker .day-item-header-item{padding:10px;flex:1;font-weight:bold}.date-picker .day-container{width:100%;flex-wrap:wrap;text-align:center}.date-picker .day-item{flex:1;line-height:36px;min-height:36px}.date-picker .day-selected{background-color:#e0edff}.date-picker .day-disabled{color:#cfcfcf}.date-picker .dayofweek{font-size:1.5em}.date-picker .day{font-size:3em}.date-picker .month{font-size:1.5em}.date-picker .year{font-size:1.5em}.date-picker .month-year{font-size:1.3em;padding:5px}.date-picker .top-banner{background-color:#000000;color:white;width:100%;padding:10px;min-height:200px}.date-picker .calendar-item-container{width:100%;padding:3px;min-height:227px}.date-picker .action-container{width:100%;justify-content:Flex-end}.date-picker .cancel-button{color:grey}\n  "],
        }),
        __metadata("design:paramtypes", [date_picker_1.DatePickerProvider, ionic_angular_1.NavParams])
    ], DatePicker);
    return DatePicker;
}());
exports.DatePicker = DatePicker;
//# sourceMappingURL=date-picker.js.map