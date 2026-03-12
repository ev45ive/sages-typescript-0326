
import {
    Collection as C,
    Person as P
} from './person'


declare global{
    type Person = P;
    type Collection<T> = C<T>;

    type X = {}
}
