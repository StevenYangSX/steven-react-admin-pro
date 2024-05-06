
export interface PageableResponse<T,P,S> {
    content: T,
    empty?:boolean,
    first:boolean,
    last:boolean,
    number:number,
    numberOfelements:number,
    pageable: P,
     size:number,
     sort:S,
     totalElements:number,
     totalPages:number

}