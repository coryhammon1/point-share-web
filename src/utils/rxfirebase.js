import { Observable } from "rxjs";

//need to get a single observable from 

class RxCollection {
    constructor(name) {
        this.name = name;
        
    }
}

export function collection(name) {

}

export function snapshotObservable(ref, f) {
    return Observable.create(o => {
        return ref.onSnapshot(doc => {
            if (!f) {
                o.next(doc);
                return;
            }

            o.next(f(doc));
        });
    });
}