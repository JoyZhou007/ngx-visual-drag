import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

//#region
const list = [NzButtonModule, NzInputModule, NzMessageModule];
//#endregion

//#region
const common = [CommonModule, FormsModule];
//#endregion

@NgModule({
  declarations: [],
  imports: [...common, ...list],
  exports: [common, ...list],
})
export class SharedModule {}
