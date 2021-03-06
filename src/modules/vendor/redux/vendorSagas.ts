import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { getErrorMessageResponse } from "../../../utils";
import { CustomFetch } from "../../common/utils";
import { getErrorToastAction } from "../../toast/utils";
import { setVendorList } from "./vendorReducer";


export function* fetchVendorListSaga(): any {
    const vendors = yield select((state: AppState) => state.vendor.list)
    if (vendors.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getVendorList)
        if (response.errors) {
            throw getErrorMessageResponse(response)
        }
        yield put(setVendorList(response.data))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}
