"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var date_picker_1 = require("./components/date-picker/date-picker");
var ionic_angular_1 = require("ionic-angular");
var date_picker_2 = require("./providers/date-picker/date-picker");
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    DatePickerModule = __decorate([
        core_1.NgModule({
            declarations: [date_picker_1.DatePicker],
            imports: [
                ionic_angular_1.IonicModule.forRoot(date_picker_1.DatePicker)
            ],
            providers: [
                date_picker_2.DatePickerProvider
            ],
            exports: [date_picker_1.DatePicker],
            entryComponents: [
                date_picker_1.DatePicker
            ]
        })
    ], DatePickerModule);
    return DatePickerModule;
}());
exports.DatePickerModule = DatePickerModule;
//# sourceMappingURL=date-picker.module.js.map