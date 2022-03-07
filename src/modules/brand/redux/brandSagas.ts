import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { getErrorMessageResponse } from "../../../utils";
import { CustomFetch } from "../../common/utils";
import { getErrorToastAction, getSuccessToastAction } from "../../toast/utils";
import { setBrandList } from "./brandReducer";


export function* fetchBrandListSaga(): any {
    const brands = yield select((state: AppState) => state.brand.list)
    if (brands.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getBrandList)
        if (response.errors) {
            yield put(getErrorToastAction(getErrorMessageResponse(response) as string))
            return;
        }
        yield put(setBrandList(response.data))
        yield put(getSuccessToastAction("Brand fetch success"))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}
