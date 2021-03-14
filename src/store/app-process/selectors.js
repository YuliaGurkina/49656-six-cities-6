import {NameSpace} from '../root-reducer';

export const getCity = (state) => state[NameSpace.PROCESS].city.name;
