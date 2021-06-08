import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFirmuPipe } from './filterFirmu';

@NgModule({
    declarations: [FilterFirmuPipe],
    imports: [CommonModule],
    exports: [FilterFirmuPipe]
})
export class SharedModule { }