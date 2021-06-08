import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFirmu'
})
export class FilterFirmuPipe implements PipeTransform {
    transform(items: any, searchText: any): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        return items.filter((it: any) => {
            if (it.ime === null || it.ime === undefined || it.ime === ''
                || searchText === null || searchText === undefined || searchText === '') {
                console.log('nema')
                return null;
            }
            return it.ime
                .toLowerCase()
                .replace(/\_/g, ' ')
                .replace(/ž/g, 'z')
                .replace(/č/g, 'c')
                .replace(/ć/g, 'c')
                .replace(/š/g, 's')
                .replace(/đ/g, 'dj').replace(/ /g, '').replace(/  /g, '')
                .replace(/\_/g, '').replace(/\,/g, '').toUpperCase()
                .includes(
                    searchText
                        .replace(/\_/g, ' ')
                        .replace(/ž/g, 'z')
                        .replace(/č/g, 'c')
                        .replace(/ć/g, 'c')
                        .replace(/š/g, 's')
                        .replace(/đ/g, 'dj').replace(/ /g, '').replace(/  /g, '')
                        .replace(/\_/g, '').replace(/\,/g, '').toUpperCase()
                );
        });
    }


}
