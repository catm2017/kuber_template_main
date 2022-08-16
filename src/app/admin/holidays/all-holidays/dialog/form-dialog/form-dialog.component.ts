import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { HolidayService } from "../../all-holidays.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { AllHoliday } from "../../all-holidays.model";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  holidayForm: FormGroup;
  holiday: AllHoliday;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public holidayService: HolidayService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.holiday.hName;
      this.holiday = data.holiday;
    } else {
      this.dialogTitle = "New Holiday";
      this.holiday = new AllHoliday({});
    }
    this.holidayForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.holiday.id],
      hName: [this.holiday.hName],
      date: [this.holiday.date],
      location: [this.holiday.location],
      shift: [this.holiday.shift],
      details: [this.holiday.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.holidayService.addHoliday(this.holidayForm.getRawValue());
  }
}
