import ormConfig from './ormConfig';


const ormSeedConfig = {
    ...ormConfig,
    migrations : [__dirname+"src/seeds/*.ts"],

}


export  default ormConfig ; 