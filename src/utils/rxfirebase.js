import { Observable } from "rxjs";

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