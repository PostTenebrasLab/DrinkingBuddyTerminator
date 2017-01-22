import { Pipe, PipeTransform } from '@angular/core';
/*
 * Display a price
 * Takes the price as numeric and in cents.
 * Displays whole and decimals separately as strings.
 * Usage:
 *   value | priceDisplay
 * Example:
 *   {{ 1024 |  priceDisplay}}
 *   formats to: 10.24
*/
@Pipe({ name: 'priceDisplay' })
export class PriceDisplayPipe implements PipeTransform {
    transform(value: number): string {

        if (!value) { return ''; };

        let pr = value + '';
        let str = pr.slice(0, pr.length - 2) + '.' + pr.slice(-2);

        return str;
    }
}