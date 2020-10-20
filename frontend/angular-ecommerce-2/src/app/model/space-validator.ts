import {FormControl, ValidationErrors} from "@angular/forms";

export class SpaceValidator {

  static notOnlyWithSpace(control :FormControl): ValidationErrors{

    if(control != null && control.value.trim().length === 0){
      return {'notOnlyWithSpace' : true}
    } else {
      return null;
    }
  }
}
