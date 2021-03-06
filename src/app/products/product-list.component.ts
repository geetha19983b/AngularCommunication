import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    //listFilter: string;
    filterName:string;
   // showImage: boolean;
   get showImage(): boolean {
    return this.productParameterService.showImage;
}
set showImage(value: boolean) {
    this.productParameterService.showImage = value;
}
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    //  private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }

    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this.listFilter);
    // } 
    filteredProducts: IProduct[];
    products: IProduct[];
    //@ViewChild('filterElement') filterElementRef: ElementRef;
   // @ViewChild(NgModel) filterInput: NgModel;
    //@ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;
   
    includeDetail: boolean = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    //parentListFilter: string;

    constructor(private productService: ProductService,
        private productParameterService: ProductParameterService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                //this.performFilter(this.listFilter);
               // this.performFilter();
               if(this.filterComponent)
               {
               this.filterComponent.listFilter =
                    this.productParameterService.filterBy;
               }
               else
               {
                   this.performFilter();
               }
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
    //    onFilterChange(filter: string): void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }
    ngAfterViewInit(): void {
       /*  this.filterInput.valueChanges.subscribe(
            () => this.performFilter(this.listFilter)
        ); */
        // if (this.filterElementRef) {
        //     this.filterElementRef.nativeElement.focus();
        // }
        // console.log(this.inputElementRefs);
        
       // this.parentListFilter = this.filterComponent.listFilter;


    }
    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
