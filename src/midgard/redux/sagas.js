// react library imports
import authSaga from "./authuser/sagas/authuser.saga"
import crudSaga from "midgard/modules/crud/redux/crud.saga"
import { all } from 'redux-saga/effects'
import coreUserSaga from "midgard/redux/coreuser/coreuser.saga"
import coreGroupSaga from "./coregroup/sagas/coregroup.saga"
import logicModuleSaga from "./logicmodule/logicmodule.saga"
import healthStatusSaga from './health-status/sagas/health-status.saga';
import accessTokenSaga from 'midgard/redux/accesstoken/accesstoken.saga';
import refreshTokenSaga from 'midgard/redux/refreshtoken/refreshtoken.saga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    // import all sagas and call them here:
    //entryPointForGulpStart
    //entryPointForGulpEnd
    authSaga(),
    coreUserSaga(),
    coreGroupSaga(),
    crudSaga(),
    logicModuleSaga(),
    healthStatusSaga(),
    accessTokenSaga(),
    refreshTokenSaga(),
  ])
}
